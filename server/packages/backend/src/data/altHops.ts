export interface AltHop {
    ip: string;
    location: [lat: number, lng: number];
}

const altHops: AltHop[] = [
    // Den Haag
    { ip: '82.136.208.58', location: [52.07656, 4.29861] },
    // Groningen
    { ip: '34.32.198.37', location: [53.21906, 6.568]},
    // Breda
    { ip: '198.176.191.100', location: [51.59056, 4.77303]},
    // Zoetermeer
    { ip: '213.10.178.29', location: [51.9749, 4.24722]},
    // Meppel
    { ip: '185.238.168.110', location: [52.71797, 6.19998]},
    // Utrecht
    { ip: '82.94.213.52', location: [52.08541, 5.1653]},
    // Almere
    { ip: '213.10.70.15', location: [52.35189, 5.14877]},
    // Nijmegen
    { ip: '92.65.58.145', location: [52.93531, 5.95951]},
    // Heerlen
    { ip: '62.140.137.186', location: [50.88545, 5.98835]},
    // Leeuwarden
    { ip: '84.85.150.241', location: [53.20659, 5.76964]},
    // Zierikzee
    { ip: '86.81.50.153', location: [51.65442, 3.93151]},
    // Brussel
    { ip: '178.51.0.235', location: [50.85336, 4.34703]},
    // Frankfurt
    { ip: '102.165.1.217', location: [50.11883, 8.68436]},
    // Berlin
    { ip: '2.210.16.148', location: [52.51965, 13.40687]},
    // London
    { ip: '20.0.124.117', location: [51.5086, -0.1257]},
    // Paris
    { ip: '37.203.210.93', location: [48.85888, 2.32004]},
    // Barcelona
    { ip: '81.61.164.107', location: [41.45315, 2.22527]},
    // Rome
    { ip: '79.17.0.179', location: [41.89033, 12.51267]},
    // Istanbul
    { ip: '193.255.12.103', location: [41.02998, 28.96018]},
    // Marrakech
    { ip: '196.112.51.170', location: [33.57922, -7.61328]},
    // Cairo
    { ip: '156.204.85.45', location: [30.05885, 31.22674]},
    // Kinshasa
    { ip: '156.0.89.125', location: [-4.32463, 15.3215]},
    // New York
    { ip: '154.12.110.168', location: [40.71237, -74.00681]},
    // Miami
    { ip: '23.15.56.27', location: [25.77417, -80.19362]},
    // Chicago
    { ip: '23.227.197.183', location: [41.84657, -87.62915]},
    // Austin
    { ip: '99.88.242.43', location: [30.18256, -97.73948]},
    // San Diego
    { ip: '70.181.204.132', location: [32.71742, -117.16277]},
    // Mexico City
    { ip: '132.248.226.2', location: [19.43262, -99.13317]},
    // Medellin
    { ip: '190.250.54.230', location: [6.25288, -75.56462]},
    // Buenos Aires
    { ip: '163.10.101.0', location: [-34.8652, -57.8857]},
    // Sao Paolo
    { ip: '179.215.168.188', location: [-23.41187, -46.43929]},
    // Tehran
    { ip: '46.32.9.248', location: [35.68241, 51.41572]},
    // Moscow
    { ip: '37.110.10.26', location: [55.74823, 37.61715]},
    // Mumbai
    { ip: '65.0.9.178', location: [18.97335, 72.8281]},
    // Singapore
    { ip: '111.221.77.175', location: [1.28991, 103.85028]},
    // Hong Kong
    { ip: '52.175.36.162', location: [22.28412, 114.17586]},
    // Shanghai
    { ip: '222.65.58.65', location: [31.22228, 121.4581]},
    // Tokyo
    { ip: '20.18.0.84', location: [35.68924, 139.68991]},
    // Honolulu
    { ip: '104.241.83.182', location: [21.32665, -157.86205]},
    // Darwin
    { ip: '150.191.12.234', location: [-12.36304, 130.87821]},
    // Sydney
    { ip: '13.237.7.186', location: [-33.86984, 151.20828]},
    // Perth
    { ip: '49.196.171.160', location: [-33.86984, 151.20828]},
    // Auckland
    { ip: '49.227.222.150', location: [-36.88666, 174.76891]},

];

export default altHops;