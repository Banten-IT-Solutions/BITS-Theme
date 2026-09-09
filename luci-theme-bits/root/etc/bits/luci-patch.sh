#!/bin/sh
# Patch isi (BUKAN timpa) file - satu engine untuk luci-core/momo/bandix.
# Data .data: 3 baris per edit (FILE, OLD, NEW).
# Idempoten: edit jalan HANYA bila OLD masih ada (sudah dipatch -> old lenyap -> skip).
# Aturan: semua edit wajib replace-style (NEW TIDAK mengandung OLD). Edit sisipan
#   (mis. s.hidetitle=true;) wajib sertakan konteks TRAILING di OLD agar old lenyap.
V="${V:-/www/luci-static/resources/view}"
D="${D:-/etc/bits/luci-patch.data}"
while IFS= read -r f; do
  IFS= read -r o
  IFS= read -r n
  [ -f "$V/$f" ] || continue
  awk -v o="$o" -v n="$n" '
    index($0, o) == 0 { print; next }
    { r=""; p=index($0, o)
      while (p) { r = r substr($0,1,p-1) n; $0 = substr($0,p+length(o)); p = index($0, o) }
      print r $0
    }
  ' "$V/$f" > "$V/$f.tmp" && mv "$V/$f.tmp" "$V/$f"
done < "$D"