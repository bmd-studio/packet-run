# Packet Run — Hall Sensor Server
This is a Node script that will output the value of a particular GPIO Pin (#2)
as a simple text-based API whether the magnet is engaged or not.

The API is server on `http://localhost:8000` and will output a simple `true` or
`false` for all routes. `true` means a magnet is close to the hall sensor,
`false` means a magnet is absent.