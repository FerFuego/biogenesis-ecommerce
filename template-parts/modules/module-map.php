<?php
  // Get User Meta
  $uid = get_current_user_id();
  $userMeta = get_user_meta($uid); 
  $userMetaDistributorProvince = $userMeta['billing_distributor_province'][0];
  $userMetaDistributorLocality = $userMeta['billing_distributor_locality'][0];
  $userMetaDistributor = $userMeta['billing_distributor'][0];
  $existDefaultDistributorValues = ($userMetaDistributorLocality && $userMetaDistributorProvince && $userMetaDistributor);
  $setDefaultDistributor = (isset($args['setDefaultDistributor'])) ? $args['setDefaultDistributor'] : false;
  // Get Maps API Key
  $mapsApiKey = get_field('bb-google_maps_api_key', 'option')
?>

<!-- Scripts for Google Maps API -->
<script src="https://maps.googleapis.com/maps/api/js?key=<?php echo $mapsApiKey; ?>"></script>

<div class="map <?php echo ($existDefaultDistributorValues) ?: 'js-map-disable-selects'; ?>">
  <div id="map" class="map__container"></div>  

  <div class="map__message d-none" id="js-map-message">
    <p class="map__message-copy map__message-copy--address" id="js-map-message-address"></p>
    <p class="map__message-copy map__message-copy--opening-hours" id="js-map-message-opening-hours"></p>
  </div>
</div>

<?php 
  $markers = array();
  $initZoom = $args['initZoom'];
  $markerSize = $args['markerSize'];
  $markerIcon = $args['markerIcon'];
  $distributors = get_users( 'role=distributor' );

  foreach($distributors as $distributor) {
    $distributorID = $distributor->ID;
    $distributorLogin = get_userdata($distributorID)->user_login;
    $tecnicoVendedor = get_field('user_distributor_tecnico-vendedor', 'user_' . $distributorID);
    $mapProps = get_field('user_distributor_map', 'user_' . $distributorID);
    $openingHours = get_field('user_distributor_opening_hours', 'user_' . $distributorID);
    $address = get_field('user_distributor_client_street', 'user_' . $distributorID);
    $locality = get_field('user_distributor_locality', 'user_' . $distributorID);
    $province = get_field('user_distributor_province', 'user_' . $distributorID);
    $distributorName = get_field('user_distributor_nombre_de_fantasia', 'user_' . $distributorID); 
    $distributorEmail = get_field('email-notificaciones-veterinaria', 'user_' . $distributorID); 
    $distributorEmailAlternative = get_field('email-notificaciones-veterinaria-alternativo', 'user_' . $distributorID); 
    $state = $mapProps['state'];

    if ($mapProps) {
      $lat = $mapProps['lat'];
      $lng = $mapProps['lng'];
    } else {
      $lat = get_field('user_distributor_client_lat', 'user_' . $distributorID);
      $lng = get_field('user_distributor_client_lon', 'user_' . $distributorID);
    }

    $markers[] = array(
      'uid' => $distributorID,
      'login' => $distributorLogin,
      'tecnicoVendedor' => @$tecnicoVendedor->ID,
      'lat' => $lat,
      'lng' => $lng,
      'address' => $address,
      'state' => $state,
      'openingHours' => $openingHours,
      'province' => $province,
      'locality' => $locality,
      'distributorName' => $distributorName,
      'email' =>  $distributorEmail,
      'emailAlternative' =>  $distributorEmailAlternative,
    );
  }
?>
<script>
  // Google Map
  const map = document.getElementById('map');
  const initMap = () => {
    const templateUrl = templatePath.templateUrl;
    const mapElement = document.getElementById('map');
    const mapOptions = {
      zoom: <?php echo $initZoom; ?>,
      center: new google.maps.LatLng(-40.5000000, -60.0000000),
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      disableDoubleClickZoom: false,
      clickableIcons: false,
      disableDefaultUI: true,
    }
    const map = new google.maps.Map(mapElement, mapOptions);
    let icon, lat, lng;

    const markers = [];
    <?php foreach($markers as $marker): ?>
        lat = parseFloat("<?php echo $marker['lat']; ?>");
        lng = parseFloat("<?php echo $marker['lng']; ?>");
        icon = templateUrl + '/assets/img/icons/<?php echo $markerIcon ? $markerIcon : 'marker'; ?>.svg';

        markers.push({
          uid: "<?php echo $marker['uid']; ?>",
          login: "<?php echo $marker['login']; ?>",
          tecnicoVendedor: "<?php echo $marker['tecnicoVendedor'];?>",
          position: {lat: lat, lng: lng},
          map,
          icon,
          province: "<?php echo $marker['province']; ?>",
          locality: "<?php echo $marker['locality']; ?>",
          distributorName: "<?php echo $marker['distributorName']; ?>",
          message: {
            email: "<?php echo $marker['email']; ?>",
            emailAlternative: "<?php echo $marker['emailAlternative']; ?>",
            state: "<?php echo $marker['state']; ?>",
            address: "<?php echo $marker['address'] . ', ' .$marker['locality'] . ', ' . $marker['province'] ?>",
            openingHours: "<?php echo $marker['openingHours'] ?>",
          },
        });
    <?php endforeach; ?>

    markers.forEach(marker => {
      const markerMaps = new google.maps.Marker({
        position: marker.position,
        map: marker.map,
        icon: {
          url: marker.icon,
          <?php if ( $markerSize ) : ?>
          scaledSize: new google.maps.Size(<?php echo $markerSize['width']; ?>,<?php echo $markerSize['height']; ?>),
          <?php endif; ?>
        }
      });
      markerMaps.addListener("click", () => {
        const { address, openingHours } = marker.message;
        showMapMessage(true, address, openingHours, marker.distributorName, marker.login, marker.tecnicoVendedor);
      });
    });

    // Focus
    const setFocus = (position, zoom) => {
      map.setCenter(position)
      map.setZoom(zoom);
    }

    // Selects Distributor
    const selectProvince = document.getElementById('billing_distributor_province');
    const selectLocality = document.getElementById('billing_distributor_locality');
    const selectDistributor = document.getElementById('billing_distributor');
    const searchVetInput = document.querySelector('.js-search-basic-vetes');

    selectProvince.addEventListener('change', () => {
      const currentValue = selectProvince.value;
      const province = markers.filter(marker => marker.province == selectProvince.value);

      showMapMessage(false);
      setFocus(province[0].position, 9)
    })

    selectLocality.addEventListener('change', () => {
      const currentValue = selectLocality.value;
      const locality = markers.filter(marker => marker.locality == selectLocality.value);

      showMapMessage(false);
      setFocus(locality[0].position, 13)
    })

    if (selectDistributor) {
      selectDistributor.addEventListener('change', () => {
        setDistributorAndShowDescription(selectDistributor.value);
      })
    }

    // new vet serch with select2.js
    jQuery('.js-search-basic-vetes').on('select2:select', function (e) {
        console.log(e.params.data);
        setDistributorAndShowDescription(e.params.data.text);
    });

    // Set Distributor And Show Description
    const setDistributorAndShowDescription = (distributorValue) => {
      const distributor = markers.filter(marker => marker.distributorName == distributorValue);
      const { position, message, distributorName, login, tecnicoVendedor, email, emailAlternative } = distributor[0];
      const { address, openingHours } = message;
      setFocus(position, 17);
      showMapMessage(true, address, openingHours, distributorName, login, tecnicoVendedor, message.email, message.emailAlternative);
    }

    // Show Message
    const showMapMessage = (showMessage, address, openingHours, distributorName, distributorLogin, tecnicoVendedor = '', email = '', emailAlternative = '') => {
      const mapMessage = document.getElementById('js-map-message');
      const mapMessageAddress = document.getElementById('js-map-message-address');
      const mapMessageOpeningHours = document.getElementById('js-map-message-opening-hours');
      const confirmationModalVetName = document.getElementById('js-order-confirmation-vete-name')
      const confirmationModalVetAdress = document.getElementById('js-order-confirmation-vete-adress')
      mapMessageAddress.textContent = `${ address && address + ' - ' } ${ distributorName }`;
      confirmationModalVetName.innerHTML = distributorName
      confirmationModalVetAdress.innerHTML = address
      let hiddenAddress = address
      if (hiddenAddress) {
        hiddenAddress = address.split(',')
      }
      if (hiddenAddress) {
        hiddenAddress.shift()
      }
      mapMessageOpeningHours.textContent = openingHours;

      if (showMessage) {
        mapMessage.classList.remove('d-none');
        setTimeout(() => {
          mapMessage.classList.add('active');
        }, 100);
      } else {
        mapMessage.classList.add('d-none');
        mapMessage.classList.remove('active');
      }
      if (!openingHours) {
        mapMessageOpeningHours.classList.add('d-none')
        mapMessageOpeningHours.classList.remove('d-block')
      } else {
        mapMessageOpeningHours.classList.add('d-block')
        mapMessageOpeningHours.classList.remove('d-none')
      }
    }
  }
  google.maps.event.addDomListener(window, 'load', initMap);
</script>