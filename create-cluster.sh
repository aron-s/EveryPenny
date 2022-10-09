#!/bin/bash
KEY_PAIR=everypenny-cluster
    ecs-cli up \
      --keypair $KEY_PAIR  \
      --capability-iam \
      --size 2 \
      --instance-type t2.micro \
      --tags project=everypenny-cluster,owner=CS490 \
      --cluster-config everypenny \
      --ecs-profile everypenny \
      --force