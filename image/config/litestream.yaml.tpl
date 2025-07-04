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
        # Create snapshots more frequently to reduce restore time
        snapshot-interval: 30m
        # Reduce retention to save space and improve restore speed
        retention: 12h
        sync-interval: 30s