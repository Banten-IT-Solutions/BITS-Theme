#!/usr/bin/env bash
# Pack luci-theme-bits: .ipk (opkg) + .apk (apk) tanpa OpenWrt SDK.
# .ipk = tar.gz luar (debian-binary + control.tar.gz + data.tar.gz)
# .apk = apk-tools v3 `mkpkg` (butuh binary `apk` di PATH / env APK_BIN)
set -euo pipefail

PKG_NAME=luci-theme-bits
PKG_VER=$(awk -F': ' '/^Version:/{print $2; exit}' "$PKG_NAME/control")
PKG_DESC=$(awk -F': ' '/^Description:/{print $2; exit}' "$PKG_NAME/control")
PKG_DEPENDS=$(awk -F': ' '/^Depends:/{print $2; exit}' "$PKG_NAME/control" | tr ',' ' ')

OUT_IPK="dist/${PKG_NAME}_${PKG_VER}_all.ipk"
OUT_APK="dist/${PKG_NAME}_${PKG_VER}_all.apk"

rm -rf .build dist
mkdir -p .build/root .build/control .build/outer dist

# root/ -> payload
cp -a "$PKG_NAME/root/." .build/root/

# ===== .ipk (opkg) =====
cp "$PKG_NAME/control" .build/control/control
if [ -f "$PKG_NAME/postinst" ]; then
  cp "$PKG_NAME/postinst" .build/control/postinst
  chmod 755 .build/control/postinst
fi
if [ -f "$PKG_NAME/conffiles" ]; then
  cp "$PKG_NAME/conffiles" .build/control/conffiles
fi

tar czf .build/data.tar.gz --owner=0 --group=0 -C .build/root .
tar czf .build/control.tar.gz --owner=0 --group=0 -C .build/control .
printf '2.0\n' > .build/debian-binary

cp .build/debian-binary .build/control.tar.gz .build/data.tar.gz .build/outer/
tar czf "$OUT_IPK" -C .build/outer .

# ===== .apk (apk-tools v3) =====
APK_BIN="${APK_BIN:-apk}"
if command -v "$APK_BIN" >/dev/null 2>&1; then
  APK_ARGS=(
    mkpkg
    --info "name:${PKG_NAME}"
    --info "version:${PKG_VER}-r0"
    --info "arch:noarch"
    --info "description:${PKG_DESC}"
    --info "license:MIT"
    --info "depends:${PKG_DEPENDS}"
  )
  if [ -f "$PKG_NAME/postinst" ]; then
    APK_ARGS+=(--script "post-install:$PKG_NAME/postinst")
  fi
  APK_ARGS+=(--files .build/root --output "$OUT_APK")
  "$APK_BIN" "${APK_ARGS[@]}"
  echo "Built: $OUT_APK"
fi

rm -rf .build
echo "Built: $OUT_IPK"