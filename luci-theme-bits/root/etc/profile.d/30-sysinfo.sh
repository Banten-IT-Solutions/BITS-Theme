#!/bin/sh
. /usr/share/libubox/jshn.sh
Width=0
StartRuler="1"
EndRuler="1"
LastErrors="1"
NormalColor=""
MachineColor=""
ValueColor=""
AddrColor=""
RXTXColor=""
ErrorColor=""
ExtraName=""
ExtraValue=""
HTML=""

initialize() { # <Script Parameters>
	local ColorMode="c"
	# Logika deteksi HTML/CGI dihapus
	
	[ -e /etc/banner ] && Width=$(awk 'BEGIN{max=0}{if(length($0)>max)max=length($0)}END{print max}' /etc/banner 2>/dev/null)
	while [ -n "$1" ]; do
		case "$1" in
		-h|--help)	echo -e	"Usage: $0 [-h|--help] [[-m|--mono]|[-bw|-black-white]|[-c2|--color-2]] [-sr|--no-start-ruler] [-er|--no-end-ruler]"\
							"[-w N|--width N] [-en Name|--extra-name Name] [-ev Value|--extra-value Value] [-le|--no-last-err]"\
							"\n\t-h\t\tThis help,"\
							"\n\t-m\t\tDisplay mono version,"\
							"\n\t-bw\t\tDisplay black-white version,"\
							"\n\t-c2\t\tDisplay alternative color version 2,"\
							"\n\t-sr\t\tWithout start horizontal ruler,"\
							"\n\t-er\t\tWithout end horizontal ruler,"\
							"\n\t-w N\t\tSet width of text area to N characters (minimum 60)"\
							"\n\t-en Name\tPrint extra name"\
							"\n\t-ev Value\tPrint extra value"\
							"\n\t-le\t\tDon't display last errors"
					exit 1;;
		-m|--mono) ColorMode="m";;
		-bw|--black-white) ColorMode="bw";;
		-c2|--color-2) ColorMode="c2";;
		-sr|--no-start-ruler) StartRuler="0";;
		-er|--no-end-ruler) EndRuler="0";;
		-w|--width) shift; Width=$1;;
		-en|--extra-name)	while [ -n "$2" ] && [ "${2:0:1}" != "-" ]; do
								shift
								[ "$ExtraName" != "" ] && ExtraName="$ExtraName "
								ExtraName="$ExtraName$1"
							done;;
		-ev|--extra-value)	while [ -n "$2" ] && [ "${2:0:1}" != "-" ]; do
								shift
								[ "$ExtraValue" != "" ] && ExtraValue="$ExtraValue "
								ExtraValue="$ExtraValue$1"
							done;;
		-le|--no-last-err)	LastErrors="0";;
		*) echo "Invalid option: $1. Use -h for help";;
		esac
		shift;
	done
	case "$ColorMode" in
c)	NormalColor="\e[0m"
		MachineColor="\e[0;33m"
		ValueColor="\e[1;36m"
		AddrColor="\e[1;31m"
		RXTXColor="\e[2;32m"
		ErrorColor="\e[0;31m"
		SepColor="\e[2;37m"
		WhiteColor="\e[1;37m";;
		c2)	NormalColor="\e[0m"
			MachineColor="\e[0;31m"
			ValueColor="\e[0;33m"
			AddrColor="\e[0;35m"
			RXTXColor="\e[0;36m"
			ErrorColor="\e[0;31m";;
		m)	NormalColor="\e[0m"
			MachineColor="\e[7m"
			ValueColor="\e[1m"
			AddrColor="\e[4m"
			RXTXColor="\e[1m"
			ErrorColor="\e[4";;
		# Case 'html' dan blok HTML/CSS telah dihapus
		*)	;;
	esac
	([ "$Width" == "" ] || [ "$Width" -lt 65 ]) && Width=65
	# Blok Kondisional untuk Output HTML telah dihapus
}

finalize() {
	# Blok Kondisional untuk Penutup HTML telah dihapus
	: # Membiarkan fungsi ini tetap ada, meskipun kosong, untuk menjaga alur skrip
}

human_readable() { # <Number of bytes>
	if [ $1 -gt 0 ]; then
		printf "$(awk -v n=$1 'BEGIN{for(i=split("B KB MB GB TB PB",suffix);s<1;i--)s=n/(2**(10*i));printf (int(s)==s)?"%.0f%s":"%.1f%s",s,suffix[i+2]}' 2>/dev/null)"
	else
		printf "0B"
	fi
}

device_rx_tx() { # <Device>
	local RXTX=$(awk -v Device=$1 '$1==Device ":"{printf "%.0f\t%.0f",$2,$10}' /proc/net/dev 2>/dev/null)
	[ "$RXTX" != "" ] && printf "rx/tx: $RXTXColor$(human_readable $(echo "$RXTX" | cut -f 1))$NormalColor/$RXTXColor$(human_readable $(echo "$RXTX" | cut -f 2))$NormalColor"
}

uptime_str() { # <Time in Seconds>
	local Uptime=$1
	if [ $Uptime -gt 0 ]; then
		local Days=$(expr $Uptime / 60 / 60 / 24)
		local Hours=$(expr $Uptime / 60 / 60 % 24)
		local Minutes=$(expr $Uptime / 60 % 60)
		local Seconds=$(expr $Uptime % 60)
		if [ $Days -gt 0 ]; then
			Days=$(printf "%dd " $Days)
		else
			Days=""
		fi 2>/dev/null
		printf "$Days%02d:%02d:%02d" $Hours $Minutes $Seconds
	fi
}

print_line() { # <String to Print>, [[<String to Print>] ...]
	local Line="$@"
	printf "%b\n" " $Line" 2>/dev/null
}

# bar() — progress bar 10 blok, warna ikut beban (hijau/kuning/merah)
bar() { # <percent-int> [width]
	local p=$1 w=${2:-10} filled=0 i=0 out=""
	[ "$p" -lt 0 ] && p=0
	[ "$p" -gt 100 ] && p=100
	filled=$((p * w / 100))
	if [ "$p" -lt 50 ]; then out="\e[1;32m"; elif [ "$p" -lt 80 ]; then out="\e[1;33m"; else out="\e[1;31m"; fi
	while [ $i -lt $filled ]; do out="${out}█"; i=$((i+1)); done
	out="${out}\e[2;37m"
	while [ $i -lt $w ]; do out="${out}░"; i=$((i+1)); done
	out="${out}\e[0m"
	printf "%s" "$out"
}

# row_color() — hue pelangi menurun per baris
row_color() { # <index>
	case $(( $1 % 7 )) in
		0) printf "\e[38;5;196m";; 1) printf "\e[38;5;208m";; 2) printf "\e[38;5;226m";;
		3) printf "\e[38;5;46m";;  4) printf "\e[38;5;51m";;  5) printf "\e[38;5;39m";;
		6) printf "\e[38;5;201m";;
	esac
}

# rainbow_line() — garis ─ gradasi pelangi (chunk 3)
rainbow_line() { # <width>
	local W=$1 i=0 out="" code
	while [ $i -lt $W ]; do
		case $(( (i / 3) % 7 )) in
			0) code=196;; 1) code=208;; 2) code=226;; 3) code=46;; 4) code=51;; 5) code=39;; 6) code=201;;
		esac
		out="${out}\e[38;5;${code}m───\e[0m"
		i=$((i + 3))
	done
	printf "%b\n" "$out"
}

# print_row() — baris rapi: [emoji] label │ nilai, hue pelangi per baris
print_row() { # <icon> <label> <value>
	local Icon="$1" Label="$2" Value="$3"
	local C=$(row_color $RI); RI=$((RI + 1))
	printf "  %s  %b%-6s  %b│\e[0m  %b%b\e[0m\n" "$Icon" "$C" "$Label" "$C" "$C" "$Value" 2>/dev/null
}

sys_temp=$(cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq | sed 's/ *([^)]*)//g')
sys_tempx=$(echo ${sys_temp} | sed 's/ / /g')
# cpu temp
if grep -q "ipq40xx" "/etc/openwrt_release"; then
	cpu_temp="$(sensors | grep -Eo '\+[0-9]+.+C' | sed ':a;N;$!ba;s/\n/ /g;s/+//g')"
elif [[ -f "/sys/class/hwmon/hwmon0/temp1_input" ]]; then
	cpu_temp="$(awk '{ printf("%.1f °C", $0 / 1000) }' /sys/class/hwmon/hwmon0/temp1_input)"
elif [[ -f "/sys/class/hwmon/hwmon1/temp1_input" ]]; then
	cpu_temp="$(awk '{ printf("%.1f °C", $0 / 1000) }' /sys/class/hwmon/hwmon1/temp1_input)"
elif [[ -f "/sys/class/thermal/thermal_zone0/temp" ]]; then
	cpu_temp="$(awk '{ printf("%.1f °C", $0 / 1000) }' /sys/class/thermal/thermal_zone0/temp)"
elif [[ -f "/sys/class/thermal/thermal_zone1/temp" ]]; then
	cpu_temp="$(awk '{ printf("%.1f °C", $0 / 1000) }' /sys/class/thermal/thermal_zone1/temp)"
else
	cpu_temp="- °C"
fi
cpu_tempx="$(echo ${cpu_temp} | sed -e 's/°C//g' -e 's/[ ][ ]*//g')"
[[ "$(echo ${cpu_tempx} | awk -F'.' '{print $1}' | wc -c)" -gt "3" ]] && cpu_tempx="${cpu_tempx:0:2}.0"
# board type
stb="Amlogic B860H"
kernel=$(echo $(uname -r) | cut -d- -f1)
print_machine() {
	print_row "🖥️" "Model"  "$stb"
	print_row "⚙️" "Arch"   "$sys_tempx · ${cpu_temp}"
	print_row "🐧" "Kernel" "$kernel"
}

print_times() {
	local SysUptime=$(cut -d. -f1 /proc/uptime)
	local Uptime=$(uptime_str $SysUptime)
	local Now=$(date +'%H:%M:%S · %Y-%m-%d')
	print_row "⏱️" "Uptime" "$Uptime · $Now"
}

print_disk() {
	local Info=$(df -k / 2>/dev/null | awk 'NR>1 && $2>0{printf "%.0f\t%.0f\t%.1f",$2*1024,$3*1024,($3/$2)*100}')
	[ -z "$Info" ] && return
	local Total=$(echo "$Info" | cut -f1)
	local Used=$(echo "$Info" | cut -f2)
	local Pct=$(echo "$Info" | cut -f3)
	local pcti=$(echo "$Pct" | cut -d. -f1)
	local C=$(row_color $RI)
	print_row "💾" "Disk" "$(printf '%-16s' "$(human_readable $Used) / $(human_readable $Total)")$(bar $pcti)  ${C}${Pct}%\e[0m"
}

print_memory() {
	local Mem=$(awk 'BEGIN{Total=0;Free=0}$1~/^MemTotal:/{Total=$2}$1~/^MemFree:|^Buffers:|^Cached:/{Free+=$2}END{Used=Total-Free;printf "%.0f\t%.0f\t%.1f",Total*1024,Used*1024,(Total>0)?((Used/Total)*100):0}' /proc/meminfo 2>/dev/null)
	local Total=$(echo "$Mem" | cut -f1)
	local Used=$(echo "$Mem" | cut -f2)
	local Pct=$(echo "$Mem" | cut -f3)
	local pcti=$(echo "$Pct" | cut -d. -f1)
	local C=$(row_color $RI)
	print_row "🧠" "Memory" "$(printf '%-16s' "$(human_readable $Used) / $(human_readable $Total)")$(bar $pcti)  ${C}${Pct}%\e[0m"
}

print_swap() {
	local Sw=$(awk 'BEGIN{Total=0;Free=0}$1~/^SwapTotal:/{Total=$2}$1~/^SwapFree:/{Free=$2}END{Used=Total-Free;printf "%.0f\t%.0f\t%.1f",Total*1024,Used*1024,(Total>0)?((Used/Total)*100):0}' /proc/meminfo 2>/dev/null)
	local Total=$(echo "$Sw" | cut -f1)
	[ "$Total" -gt 0 ] || return
	local Used=$(echo "$Sw" | cut -f2)
	local Pct=$(echo "$Sw" | cut -f3)
	local pcti=$(echo "$Pct" | cut -d. -f1)
	local C=$(row_color $RI)
	print_row "🔄" "Swap" "$(printf '%-16s' "$(human_readable $Used) / $(human_readable $Total)")$(bar $pcti)  ${C}${Pct}%\e[0m"
}

print_wan() {
	local Zone
	local Device
	for Zone in $(uci -q show firewall | grep .masq= | cut -f2 -d.); do
		if [ "$(uci -q get firewall.$Zone.masq)" == "1" ]; then
			for Device in $(uci -q get firewall.$Zone.network); do
				local Status="$(ubus call network.interface.$Device status 2>/dev/null)"
				if [ "$Status" != "" ]; then
					local State=""
					local Iface=""
					local Uptime=""
					local IP4=""
					local IP6=""
					local Subnet4=""
					local Subnet6=""
					local Gateway4=""
					local Gateway6=""
					local DNS=""
					local Protocol=""
					json_load "${Status:-{}}"
					json_get_var State up
					json_get_var Uptime uptime
					json_get_var Iface l3_device
					json_get_var Protocol proto
					if json_get_type Status ipv4_address && [ "$Status" = array ]; then
						json_select ipv4_address
						json_get_type Status 1
						if [ "$Status" = object ]; then
							json_select 1
							json_get_var IP4 address
							json_get_var Subnet4 mask
							[ "$IP4" != "" ] && [ "$Subnet4" != "" ] && IP4="$IP4/$Subnet4"
						fi
					fi
					json_select
					if json_get_type Status ipv6_address && [ "$Status" = array ]; then
						json_select ipv6_address
						json_get_type Status 1
						if [ "$Status" = object ]; then
							json_select 1
							json_get_var IP6 address
							json_get_var Subnet6 mask
							[ "$IP6" != "" ] && [ "$Subnet6" != "" ] && IP6="$IP6/$Subnet6"
						fi
					fi
					json_select
					if json_get_type Status route && [ "$Status" = array ]; then
						json_select route
						local Index="1"
						while json_get_type Status $Index && [ "$Status" = object ]; do
							json_select "$((Index++))"
							json_get_var Status target
							case "$Status" in
								0.0.0.0)
									json_get_var Gateway4 nexthop;;
								::)
									json_get_var Gateway6 nexthop;;
							esac
							json_select ".."
						done	
					fi
					json_select
					if json_get_type Status dns_server && [ "$Status" = array ]; then
						json_select dns_server
						local Index="1"
						while json_get_type Status $Index && [ "$Status" = string ]; do
							json_get_var Status "$((Index++))"
							DNS="${DNS:+$DNS }$Status"
						done
					fi
					if [ "$State" == "1" ]; then
						[ "$IP4" != "" ] && print_row "🌐" "WAN" "$IP4 ($Iface)"
					fi
				fi
			done
		fi 
	done
}

print_lan() {
	local Zone
	local Device
	for Zone in $(uci -q show firewall | grep []]=zone | cut -f2 -d. | cut -f1 -d=); do
		if [ "$(uci -q get firewall.$Zone.masq)" != "1" ]; then
			for Device in $(uci -q get firewall.$Zone.network); do
				local Status="$(ubus call network.interface.$Device status 2>/dev/null)"
				if [ "$Status" != "" ]; then
					local State=""
					local Iface=""
					local IP4=""
					local IP6=""
					local Subnet4=""
					local Subnet6=""
					json_load "${Status:-{}}"
					json_get_var State up
					json_get_var Iface device
					if json_get_type Status ipv4_address && [ "$Status" = array ]; then
						json_select ipv4_address
						json_get_type Status 1
						if [ "$Status" = object ]; then
							json_select 1
							json_get_var IP4 address
							json_get_var Subnet4 mask
							[ "$IP4" != "" ] && [ "$Subnet4" != "" ] && IP4="$IP4/$Subnet4"
						fi
					fi
					json_select
					if json_get_type Status ipv6_address && [ "$Status" = array ]; then
						json_select ipv6_address
						json_get_type Status 1
						if [ "$Status" = object ]; then
							json_select 1
							json_get_var IP6 address
							json_get_var Subnet6 mask
							[ "$IP6" != "" ] && [ "$Subnet6" != "" ] && IP6="$IP6/$Subnet6"
						fi
					fi
					local DHCPConfig=$(uci -q show dhcp | grep .interface=$Device | cut -d. -f2)
					if [ "$DHCPConfig" != "" ] && [ "$(uci -q get dhcp.$DHCPConfig.ignore)" != "1" ]; then
						local DHCPStart=$(uci -q get dhcp.$DHCPConfig.start)
						local DHCPLimit=$(uci -q get dhcp.$DHCPConfig.limit)
						[ "$DHCPStart" != "" ] && [ "$DHCPLimit" != "" ] && DHCP="$(echo $IP4 | cut -d. -f1-3).$DHCPStart-$(expr $DHCPStart + $DHCPLimit - 1)"
					fi
					[ "$IP4" != "" ] && print_row "🏠" "LAN" "$IP4 ($Iface)"
				fi
			done
		fi 
	done
}

print_wlan() {
	local Iface
	for Iface in $(uci -q show wireless | grep device=radio | cut -f2 -d.); do
		local Device=$(uci -q get wireless.$Iface.device)
		local SSID=$(uci -q get wireless.$Iface.ssid)
		local IfaceDisabled=$(uci -q get wireless.$Iface.disabled)
		local DeviceDisabled=$(uci -q get wireless.$Device.disabled)
		if [ -n "$SSID" ] && [ "$IfaceDisabled" != "1" ] && [ "$DeviceDisabled" != "1" ]; then
			local Mode=$(uci -q -P /var/state get wireless.$Iface.mode)
			local Channel=$(uci -q get wireless.$Device.channel)
			local RadioIface=$(uci -q -P /var/state get wireless.$Iface.ifname)
			local Connection="Down"
			if [ -n "$RadioIface" ]; then
				if [ "$Mode" == "ap" ]; then
					Connection="$(iw dev $RadioIface station dump | grep Station | wc -l 2>/dev/null)"
				else
					Connection="$(iw dev $RadioIface link | awk 'BEGIN{FS=": ";Signal="";Bitrate=""} $1~/signal/ {Signal=$2} $1~/tx bitrate/ {Bitrate=$2}END{print Signal" "Bitrate}' 2>/dev/null)"
				fi
			fi
			if [ "$Mode" == "ap" ]; then
				print_line	"WLAN: $ValueColor$SSID$NormalColor($Mode),"\
							"ch: $ValueColor${Channel:-n/a}$NormalColor,"\
							"conn: $ValueColor$Connection$NormalColor$(device_rx_tx $RadioIface)"
			else
				print_line	"WLAN: $ValueColor$SSID$NormalColor($Mode),"\
							"ch: $ValueColor${Channel:-n/a}$NormalColor"
				print_line	"conn: $ValueColor$Connection$NormalColor$(device_rx_tx $RadioIface)"
			fi
		fi
	done
}

print_vpn() {
	local VPN
	for VPN in $(uci -q show openvpn | grep .ca= | cut -f2 -d.); do
		local Device=$(uci -q get openvpn.$VPN.dev)
		local Enabled=$(uci -q get openvpn.$VPN.enabled)
		if [ "$Enabled" == "1" ] || [ "$Enabled" == "" ]; then
			local Mode=$(uci -q get openvpn.$VPN.mode)
			local Connection="n/a"
			if [ "$Mode" == "server" ]; then
				Mode="$ValueColor$VPN$NormalColor(svr):$(uci -q get openvpn.$VPN.port)"
				Status=$(uci -q get openvpn.$VPN.status)
				Connection=$(awk 'BEGIN{FS=",";c=0;l=0}{if($1=="Common Name")l=1;else if($1=="ROUTING TABLE")exit;else if (l==1) c=c+1}END{print c}' $Status 2>/dev/null)
			else
				Mode="$ValueColor$VPN$NormalColor(cli)"
				Connection="Down"
				ifconfig $Device &>/dev/null && Connection="Up"
			fi
			print_line	"VPN: $Mode,"\
						"conn: $ValueColor$Connection$NormalColor$(device_rx_tx $Device)"
		fi
	done
}

print_extra() {
	([ "$ExtraName" != "" ] || [ "$ExtraValue" != "" ]) && print_line "$ExtraName $ValueColor$ExtraValue$NormalColor"
}

initialize $@
RI=0
print_machine
print_times
print_disk
print_memory
print_swap
print_wan
print_lan
print_wlan
print_vpn
print_extra
rainbow_line 51
finalize
#exit 0
# Done.
cd /root