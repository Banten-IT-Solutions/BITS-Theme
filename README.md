<div align="center">
  <h1>BITS Theme</h1>
  <p>
    <a href="https://bits.co.id">
      <img src="https://img.shields.io/badge/Banten%20IT%20Solutions-BITS%20Theme-00C853?style=for-the-badge&logo=lua&logoColor=white" alt="BITS Theme" />
    </a>
  </p>
  <p>
    Modern green LuCI theme for OpenWrt &mdash; all-in-one branding package (theme + banner + sysinfo + boot service + UI patches).
  </p>
  <br>
  <p>
    <img src="https://img.shields.io/badge/OpenWrt-00A1E9?style=flat&logo=openwrt&logoColor=white" alt="OpenWrt" />
    <img src="https://img.shields.io/badge/LuCI-3D5780?style=flat" alt="LuCI" />
    <img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS" />
    <img src="https://img.shields.io/badge/Shell-4EAA25?style=flat&logo=gnu-bash&logoColor=white" alt="Shell" />
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat" alt="MIT License" />
  </p>
</div>

---

## ✨ Features

| Feature            | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| **Theme**          | `luci-theme-bits` — green modern theme, fonts, icons, logo, dark-mode.      |
| **Branding pages** | `about.htm` + `shutdown.htm` BITS-branded.                                  |
| **SSH banner**     | Colorful BITS banner di `/etc/banner`.                                      |
| **SSH sysinfo**    | `30-sysinfo.sh` — ringkasan sistem saat login shell.                        |
| **Boot service**   | `start_service.sh` (swap/led) ter-hook ke `/etc/rc.local`.                  |
| **UI patches**     | Patch judul/tombol halaman momo, bandix, dockerman, diskman, luci-core.     |

## 📦 Package

`luci-theme-bits` — pure LuCI theme (`luci.mk`), `Depends: luci-base, rpcd`.

> **Tidak termasuk patch Tailscale** — `luci-app-tailscale >= 1.0.4` sudah drop-in (helper + menu + ACL self-contained). **Tidak termasuk patch bot** — `luci-app-bitsnetworksbot` self-contained via postinst-nya.

## 🚀 Install

```sh
opkg install luci-theme-bits_<version>_all.ipk
```

Theme otomatis terdaftar + jadi default (bisa diganti di `System → System → Design`). Ke theme lain:

```sh
uci set luci.main.mediaurlbase='/luci-static/bootstrap'
uci commit luci
```

## 📁 Project Structure

```text
BITS-Theme/
└── luci-theme-bits/
    ├── Makefile                 # luci.mk (feeds/luci/themes)
    ├── control                  # ipk metadata
    ├── postinst                 # banner + rc.local hook + apply patches
    └── root/
        ├── www/luci-static/bits/        # css/js/fonts/icons/logo
        ├── usr/share/ucode/luci/template/themes/bits/  # header/footer/sysauth
        ├── usr/lib/lua/luci/view/       # about.htm + shutdown.htm
        ├── usr/share/bits-theme/banner  # SSH banner
        ├── etc/profile.d/30-sysinfo.sh  # login sysinfo
        ├── etc/custom_service/start_service.sh
        ├── etc/uci-defaults/40_bits_theme
        └── etc/bits/                    # patch engine + data (momo/bandix/dockerman/diskman/luci)
```

## 🏗️ Build

```sh
./build.sh
# output: dist/luci-theme-bits_<version>_all.ipk
```

## 🚀 Release

Conventional commit (`fix:` patch, `feat:` minor) → push `main` → semantic-release build `.ipk` + GitHub Release.

---

## 📄 License

Distributed under the MIT License. See `LICENSE`.

---

<div align="center">
  <strong>BITS Theme</strong> Developed with ❤️ by <a href="https://bits.co.id"><strong>Banten IT Solutions</strong></a>
</div>