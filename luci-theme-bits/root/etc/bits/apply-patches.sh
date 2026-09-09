#!/bin/sh
# Apply patch UI BITS (tanpa tailscale — sudah drop-in di ipk luci-app-tailscale >=1.0.4).
# Idempoten: luci-patch.sh + sed hanya jalan bila pola masih ada.
B=/etc/bits

# --- PATCH isi file milik app pihak ketiga + luci-core (edit, bukan timpa) ---
V=/www/luci-static/resources/view D="$B/momo/momo-patch.data" sh "$B/luci-patch.sh"
V=/usr/lib/lua/luci/model/cbi D="$B/dockerman/dockerman-patch.data" sh "$B/luci-patch.sh"
V=/usr/lib/lua/luci/view D="$B/dockerman/dockerman-view-patch.data" sh "$B/luci-patch.sh"
V=/usr/lib/lua/luci/model/cbi D="$B/diskman/diskman-patch.data" sh "$B/luci-patch.sh"

# luci-core (pakai default V/D di dalam engine)
sh "$B/luci-patch.sh"

V=/www/luci-static/resources/view D="$B/bandix/bandix-patch.data" sh "$B/luci-patch.sh"

# --- Menu system: branding Backup & Restore + urutan ---
sed -i 's|Backup / Flash Firmware|Backup \& Restore|' /usr/share/luci/menu.d/luci-mod-system.json 2>/dev/null
sed -i 's|"order": 90|"order": 72|' /usr/share/luci/menu.d/luci-mod-system.json 2>/dev/null
sed -i 's|_("Cleanup"), 70|_("Cleanup"), 71|' /usr/lib/lua/luci/controller/release_ram.lua 2>/dev/null
sed -i 's|_("Shutdown"),80|_("Shutdown"),73|' /usr/lib/lua/luci/controller/shutdown.lua 2>/dev/null

# --- ip-full untuk momo (ip -j JSON; busybox ip tak support) ---
[ -x /usr/libexec/ip-full ] && ln -sf /usr/libexec/ip-full /sbin/ip

# --- Reload LuCI ---
rm -rf /tmp/luci-* /tmp/.uci
/etc/init.d/rpcd restart >/dev/null 2>&1

echo "BITS theme patches applied."
exit 0