dbs:
  - path: /opt/packet-run/server/packages/backend/data/packet-run.db
    replicas:
      - type: s3
        bucket: ${litestream_bucket}
        path: packet-run/db
        access-key-id: ${litestream_access_key}
        secret-access-key: ${litestream_access_secret}
        endpoint: ${litestream_endpoint} 