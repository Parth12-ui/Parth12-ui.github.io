#!/bin/bash
# Simple script to serve the portfolio website
cd "$(dirname "$0")"
python3 -m http.server 8000
