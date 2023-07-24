---
title: 1. 项目环境配置
author: Cyril
---

## Introduction

为了方便debug，我们在cmake操作之前先修改CMakeList.txt，将`set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -O0 -ggdb -fsanitize=${BUSTUB_SANITIZER} -fno-omit-frame-pointer -fno-optimize-sibling-calls")
`修改为`set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -O0 -ggdb")`。

## Details

- [baz](baz.md)
- ...
