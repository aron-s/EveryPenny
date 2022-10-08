#!/bin/bash
KEY_PAIR=tutorial-cluster
    ecs-cli up \
      --keypair $KEY_PAIR  \
      --capability-iam \
      --size 2 \
      --instance-type t2.micro \
      --tags project=CS490-cluster,owner=jihadul \
      --cluster-config tutorial \
      --ecs-profile tutorial