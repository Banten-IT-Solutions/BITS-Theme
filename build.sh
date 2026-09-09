#!/usr/bin/env bash
# Pack luci-theme-bits jadi .ipk tanpa OpenWrt SDK.
# Format ipk OpenWrt = tar.gz luar berisi ./debian-binary + ./control.tar.gz + ./data.tar.gz.
set -euo pipefail

PKG_NAME=luci-theme-bits
PKG_VER=$(awk -F': ' '/^Version:/{print $2; exit}' "$PKG_NAME/control")
OUT="dist/${PKG_NAME}_${PKG_VER}_all.ipk"

rm -rf .build dist
mkdir -p .build/root .build/control .build/outer dist

# root/ -> payload ipk
cp -a "$PKG_NAME/root/." .build/root/

# control + postinst
cp "$PKG_NAME/control" .build/control/control
if [ -f "$PKG_NAME/postinst" ]; then
	cp "$PKG_NAME/postinst" .build/control/postinst
	chmod 755 .build/control/postinst
fi

tar czf .build/data.tar.gz --owner=0 --group=0 -C .build/root .
tar czf .build/control.tar.gz --owner=0 --group=0 -C .build/control .
printf '2.0\n' > .build/debian-binary

cp .build/debian-binary .build/control.tar.gz .build/data.tar.gz .build/outer/
tar czf "$OUT" -C .build/outer .

rm -rf .build
echo "Built: $OUT"