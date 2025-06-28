dbs:
  - path: /opt/packet-run/server/packages/backend/data/packet-run.db
    replicas:
      - type: s3
        bucket: <LITESTREAM_BUCKET>
        path: db
        endpoint: <LITESTREAM_ENDPOINT>
        region: <LITESTREAM_REGION>
        access-key-id: <LITESTREAM_ACCESS_KEY>
        secret-access-key: <LITESTREAM_ACCESS_SECRET> 