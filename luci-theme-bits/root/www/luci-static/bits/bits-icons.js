/* BITS sidebar icons: decorate menu-bits links + brand + mobile toggle */
(function(){
  function iconFor(text, href){
    var t = ' ' + String(text || '').toLowerCase() + ' ';
    var h = ' ' + String(href || '').toLowerCase().replace(/admin|luci|cgi-bin|[:\/?.=_-]+/g, ' ') + ' ';
    function any(s){ return t.indexOf(s) >= 0 || h.indexOf(s) >= 0; }
    function word(s){ return t.indexOf(' ' + s + ' ') >= 0 || h.indexOf(' ' + s + ' ') >= 0; }
    if (any('logout') || any('log out') || any('keluar')) return '\uD83D\uDEAA';
    if (any('reboot') || any('mulai ulang')) return '\uD83D\uDD04';
    if (any('backup') || any('cadangan') || any('flash') || any('firmware')) return '\uD83D\uDCBE';
    if (any('package') || any('paket') || any('software') || any('opkg')) return '\uD83D\uDCE6';
    if (any('docker') || any('kontainer')) {
      if (word('config') || word('configuration')) return '\uD83D\uDD27';
      if (word('overview')) return '\uD83D\uDCCA';
      if (word('containers')) return '\uD83D\uDCE6';
      if (word('images')) return '\uD83D\uDDBC';
      if (word('networks')) return '\uD83C\uDF10';
      if (word('volumes')) return '\uD83D\uDCBE';
      if (word('events')) return '\uD83D\uDCDC';
      return '\uD83D\uDC33';
    }
    if (any('overview') || any('beranda') || any('ikhtisar') || word('home')) return '\uD83C\uDFE0';
    if (any('about') || any('tentang')) return '\u2139\uFE0F';
    if (any('cleanup') || any('bersih')) return '\uD83E\uDDF9';
    if (any('scheduled') || any('tasks')) return '\uD83D\uDCC5';
    if (any('wizard') || any('generator')) return '\uD83E\uDE84';
    if (any('startup') || any('boot')) return '\uD83D\uDE80';
    if (any('process') || any('proses')) return '\uD83D\uDCCB';
    if (any('kernel') || any('dmesg')) return '\uD83D\uDC27';
    if (t.trim() === 'status' && h.indexOf('bandix') >= 0) return '\uD83D\uDCC8';
    if (any('syslog') || any('log') || any('logging')) return '\uD83D\uDCDC';
    if (word('load')) return '\uD83C\uDFCB\uFE0F';
    if (any('bandwidth')) return '\uD83D\uDCB9';
    if (any('connection')) return '\uD83D\uDD17';
    if (any('wireless') || any('wifi') || any('nirkabel')) return '\uD83D\uDCF6';
    if (any('realtime') || any('real time') || any('monitor') || any('grafik') || any('graph')) return '\uD83D\uDCC8';
    if (any('traffic')) return '\uD83D\uDEA6';
    if (any('forward')) return '\uD83D\uDD00';
    if (word('nat')) return '\uD83D\uDD01';
    if (any('ipset') || any('ip set')) return '\uD83D\uDD22';
    if (any('led') || any('fan') || any('kipas')) return '\uD83D\uDCA1';
    if (any('global')) return '\uD83C\uDF0D';
    if (any('profile')) return '\uD83E\uDEAA';
    if (any('editor')) return '\u2328\uFE0F';
    if (any('app config')) return '\uD83D\uDDC2\uFE0F';
    if (any('mixin')) return '\uD83E\uDDEA';
    if (any('proxy')) return '\uD83D\uDD00';
    if (any('setting') || word('config')) return '\uD83D\uDD27';
    if (any('custom')) return '\uD83D\uDCDD';
    if (any('firewall')) return '\uD83D\uDD25';
    if (any('channel')) return '\uD83D\uDCFB';
    if (any('interface') || any('antarmuka')) return '\uD83D\uDD0C';
    if (any('switch') || any('vlan')) return '\uD83C\uDF9A\uFE0F';
    if (any('password') || any('sandi')) return '\uD83D\uDD11';
    if (any('bot')) return '\uD83E\uDD16';
    if (any('rout') || any('rute')) return '\uD83D\uDEE3\uFE0F';
    if (any('dhcp') || word('dns')) return '\uD83D\uDCE1';
    if (any('hostname') || any('nama host')) return '\uD83D\uDCDD';
    if (any('diagnos') || any('ping') || any('traceroute') || any('nslookup')) return '\uD83E\uDE7A';
    if (any('capture')) return '\uD83D\uDD0D';
    if (any('mount')) return '\uD83D\uDCBD';
    if (any('repo')) return '\uD83D\uDD0F';
    if (any('ssh-key') || any('sshkey') || (word('ssh') && any('key'))) return '\uD83D\uDDDD';
    if (any('ssh access') || any('dropbear')) return '\uD83D\uDDA5\uFE0F';
    if (word('ssh')) return '\uD83D\uDD11';
    if (any('http')) return '\uD83D\uDD12';
    if (any('terminal') || any('console') || any('shell') || any('perintah') || any('ttyd')) return '\uD83D\uDCBB';
    if (any('language') || any('bahasa') || any('theme') || any('tema')) return '\uD83C\uDFA8';
    if (any('time') || any('waktu') || any('ntp') || any('zona')) return '\uD83D\uDD52';
    if (word('user') || any('pengguna')) return '\uD83D\uDC65';
    if (any('administration') || word('admin')) return '\uD83D\uDC64';
    if (any('tailscale')) return '\uD83C\uDF00';
    if (any('bandix')) return '\uD83D\uDEF0\uFE0F';
    if (t.trim() === 'system' && href && href !== '#') return '\uD83C\uDF9B\uFE0F';
    if (any('modem') || any('mobile') || any('seluler') || any('sms') || any('lte') || any('qmi') || any('mbim')) return '\uD83D\uDCF1';
    if (any('docker') || any('container') || any('kontainer')) return '\uD83D\uDC33';
    if (any('torrent') || any('aria') || any('transmission') || any('unduh') || any('download')) return '\u2B07\uFE0F';
    if (any('wireguard') || any('openvpn') || word('vpn') || any('zerotier')) return '\uD83D\uDD10';
    if (any('tunnel') || any('momo') || any('clash') || any('passwall') || any('nikki') || any('v2ray') || any('xray')) return '\uD83D\uDEE1\uFE0F';
    if (any('samba') || any('nfs') || any('ftp') || any('dlna') || any('nas') || any('storage') || any('penyimpanan') || any('disk')) return '\uD83D\uDDC4';
    if (any('adblock')) return '\uD83D\uDEAB';
    if (any('ddns') || any('dinamis')) return '\uD83C\uDF0D';
    if (any('network') || any('jaringan')) return '\uD83C\uDF10';
    if (any('service') || any('layanan')) return '\uD83E\uDDE9';
    if (any('system') || any('sistem')) return '\u2699\uFE0F';
    if (any('statistic') || any('statistik') || any('vnstat')) return '\uD83D\uDCCA';
    if (any('status')) return '\uD83D\uDCCA';
    return '\uD83D\uDCC4';
  }
  /* map ikon device/port LuCI (img svg) -> emoji, konsisten dgn menu */
  function devIcon(name){
    name = String(name || '').toLowerCase();
    if (name.indexOf('port_up') >= 0) return '\uD83D\uDFE2';        /* 🟢 link up */
    if (name.indexOf('port_down') >= 0) return '\uD83D\uDD34';      /* 🔴 link down */
    if (/modem|wwan|usb|lte|3g|4g|5g|dial|tty/.test(name)) return '\uD83D\uDCF1';
    if (/wifi|wireless|wlan|radio/.test(name)) return '\uD83D\uDCF6';
    if (/bridge/.test(name)) return '\uD83D\uDDA7';
    if (/tunnel|vpn|ipsec|gre/.test(name)) return '\uD83D\uDEE1\uFE0F';
    if (/dsl|adsl|vdsl/.test(name)) return '\u260E\uFE0F';
    if (/loopback|^lo$/.test(name)) return '\uD83D\uDD01';
    if (/relay/.test(name)) return '\uD83D\uDD04';
    if (/ethernet|lan|wan|port|switch/.test(name)) return '\uD83C\uDF10';
    return null;
  }
  function decorateDevIcons(){
    var imgs = document.querySelectorAll('#maincontent img[src*="icons/"]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (img.dataset.bitsDone) continue;
      var src = img.getAttribute('src') || '';
      var m = src.match(/\/([a-z0-9_\-]+)\.svg(?:[?#]|$)/i);
      if (!m) continue;
      var e = devIcon(m[1]);
      if (!e) continue;
      var span = document.createElement('span');
      span.className = 'bits-devico';
      span.dataset.ico = m[1].replace(/[_0-9]+$/, '');
      span.setAttribute('aria-hidden', 'true');
      span.textContent = e;
      var t = img.getAttribute('title');
      if (t) span.title = t;
      if (/_disabled|_down/.test(m[1])) span.style.opacity = '0.45';
      img.replaceWith(span);
    }
  }
  /* status port (Connected/no link/kecepatan) -> emoji */
  function decorateStatus(){
    var bodies = document.querySelectorAll('.ifacebox .ifacebox-body');
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      var dev = body.firstElementChild;
      if (!dev || !dev.classList.contains('bits-devico')) continue;
      var br = dev.nextElementSibling;
      if (!br || br.tagName !== 'BR') continue;
      var node = br.nextSibling;
      if (!node) continue;
      if (node.nodeType === 1 && node.dataset.bitsSe) continue;
      var raw = (node.nodeType === 1 ? node.textContent : node.nodeValue) || '';
      var txt = raw.replace(/[\s\u202f\u00a0]+/g, ' ').trim();
      if (!txt) continue;
      txt = txt.charAt(0).toUpperCase() + txt.slice(1);
      var low = txt.toLowerCase();
      var emo = /no link|down/.test(low) ? '\uD83D\uDCA4' : (/connected|link/.test(low) ? '\u2705' : (/\d/.test(txt) ? '\u26A1' : '\uD83C\uDF10'));
      if (node.nodeType === 1) {
        var t = node.getAttribute('title');
        node.dataset.bitsSe = '1';
        node.textContent = emo + ' ' + txt;
        if (t) node.setAttribute('title', t);
      } else {
        var s = document.createElement('span');
        s.className = 'bits-status';
        s.dataset.bitsSe = '1';
        s.textContent = emo + ' ' + txt;
        node.replaceWith(s);
      }
    }
  }
  /* pisahkan ▲/▼ jadi dua span agar flex bisa dorong kiri-kanan */
  function decorateFlow(){
    var cs = document.querySelectorAll('.ifacebox .ifacebox-body .cbi-tooltip-container');
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i];
      if (c.dataset.bitsFlow) continue;
      var br = c.querySelector('br');
      if (!br) continue;
      var up = br.previousSibling, down = br.nextSibling;
      if (up && up.nodeType === 3 && (up.nodeValue || '').trim()) {
        var s1 = document.createElement('span');
        s1.className = 'bits-dir bits-up';
        s1.textContent = up.nodeValue.replace(/[\s\u202f\u00a0]+/g, ' ').trim();
        up.replaceWith(s1);
      }
      if (down && down.nodeType === 3 && (down.nodeValue || '').trim()) {
        var s2 = document.createElement('span');
        s2.className = 'bits-dir bits-down';
        s2.textContent = down.nodeValue.replace(/[\s\u202f\u00a0]+/g, ' ').trim();
        down.replaceWith(s2);
      }
      c.dataset.bitsFlow = '1';
    }
  }
  function ensureBrand(){
    var m=document.getElementById('mainmenu');
    if(!m||m.querySelector('.bits-brand')) return;
    var d=document.createElement('div');
    d.className='bits-brand';
    d.innerHTML='<a href="#" onclick="return false"><strong>BITS</strong> <em>Networks</em></a>';
    m.insertBefore(d,m.firstChild);
  }
  function ensureToggle(){
    if(document.querySelector('.bits-menu-btn')||!document.body) return;
    var b=document.createElement('button');
    b.type='button'; b.className='bits-menu-btn'; b.textContent='☰'; b.title='Menu';
    b.setAttribute('aria-label','Buka/tutup menu');
    b.addEventListener('click',function(){
      var open=document.body.classList.toggle('bits-side-open');
      var mask=document.querySelector('.darkMask');
      if(mask){ mask.style.visibility=open?'visible':''; mask.style.opacity=open?'1':''; }
    });
    document.body.appendChild(b);
    var mask=document.querySelector('.darkMask');
    if(mask&&!mask.dataset.bits){ mask.dataset.bits='1'; mask.addEventListener('click',function(){
      document.body.classList.remove('bits-side-open');
      mask.style.visibility=''; mask.style.opacity='';
    });}
  }

  // BITS: judul halaman (h2[name=content] / .bandix-header) di atas tab (#tabmenu)
  function relayoutTitle(){
    var tc=document.querySelector('#maincontent > .container');
    if(!tc) return;
    var tabmenu=tc.querySelector('#tabmenu');
    var view=tc.querySelector('#view');
    if(!tabmenu||!view) return;
    var tabs=tabmenu.querySelector('ul.tabs');
    var title=(view.querySelector('h2[name="content"]')||view.querySelector('.bandix-header')||view.querySelector('h1.bandix-title'))||tc.querySelector('[data-bits-title="1"]');
    if(!title) return;
    var old=tc.querySelectorAll('[data-bits-title="1"]');
    for(var i=0;i<old.length;i++){ if(old[i]!==title && old[i].parentNode) old[i].parentNode.removeChild(old[i]); }
    if(!tabs) return;
    if(title.parentElement===tc && title.nextElementSibling===tabmenu && title.getAttribute('data-bits-title')) return;
    title.setAttribute('data-bits-title','1');
    tc.insertBefore(title,tabmenu);
  }
  // BITS: bottom appbar — 5 section nav + sheet submenu (dari pohon #mainmenu)
  function ensureAppbar(){
    if(document.querySelector('.bits-appbar')||!document.body) return;
    if(document.body.classList.contains('node-main-login')) return;
    var m=document.getElementById('mainmenu');
    if(!m) return;
    var lis=m.querySelectorAll('.nav > li');
    var sections=[];
    for(var i=0;i<lis.length;i++){
      var li=lis[i];
      var link=li.querySelector('a');
      if(!link) continue;
      if(/logout/i.test(link.getAttribute('href')||'')) continue;
      var clone=link.cloneNode(true);
      var cico=clone.querySelector('.bits-ico');
      if(cico) cico.remove();
      var icoEl=link.querySelector('.bits-ico');
      var icon=icoEl?(icoEl.textContent||'').trim():'\u2022';
      var label=(clone.textContent||'').replace(/\s+/g,' ').trim()||'Menu';
      sections.push({li:li,icon:icon,label:label});
    }
    if(!sections.length) return;

    var bar=document.createElement('nav');
    bar.className='bits-appbar';
    bar.setAttribute('aria-label','Navigasi utama');

    var backdrop=document.createElement('div');
    backdrop.className='bits-appbar-backdrop';

    var sheet=document.createElement('div');
    sheet.className='bits-appbar-sheet';
    sheet.setAttribute('aria-hidden','true');
    var head=document.createElement('div');
    head.className='bits-appbar-sheet-head';
    var title=document.createElement('span');
    title.className='bits-appbar-sheet-title';
    var close=document.createElement('button');
    close.type='button'; close.className='bits-appbar-sheet-close';
    close.setAttribute('aria-label','Tutup menu'); close.textContent='\u2715';
    head.appendChild(title); head.appendChild(close);
    var body=document.createElement('div');
    body.className='bits-appbar-sheet-body';
    sheet.appendChild(head); sheet.appendChild(body);

    function closeSheet(){
      sheet.classList.remove('open'); sheet.setAttribute('aria-hidden','true');
      backdrop.classList.remove('open');
    }
    function openSheet(section){
      title.textContent=section.label;
      body.innerHTML='';
      var sub=section.li.querySelector('ul');
      var links=sub?sub.querySelectorAll('li > a'):[];
      for(var j=0;j<links.length;j++){
        var sa=links[j];
        var sc=sa.cloneNode(true);
        var scico=sc.querySelector('.bits-ico');
        if(scico) scico.remove();
        var saico=sa.querySelector('.bits-ico');
        var sIcon=saico?(saico.textContent||'').trim():'\u2022';
        var sLabel=(sc.textContent||'').replace(/\s+/g,' ').trim()||'Menu';
        var a=document.createElement('a');
        a.className='bits-app-item'; a.href=sa.getAttribute('href')||'#';
        if((sa.getAttribute('href')||'')===window.location.pathname) a.classList.add('active');
        var ispan=document.createElement('span');
        ispan.className='bits-ico'; ispan.setAttribute('aria-hidden','true'); ispan.textContent=sIcon;
        var lspan=document.createElement('span');
        lspan.className='bits-app-item-label'; lspan.textContent=sLabel;
        a.appendChild(ispan); a.appendChild(lspan);
        body.appendChild(a);
      }
      sheet.classList.add('open'); sheet.setAttribute('aria-hidden','false');
      backdrop.classList.add('open');
    }

    var buttons=[];
    for(var k=0;k<sections.length;k++){
      (function(section){
        var btn=document.createElement('button');
        btn.type='button';
        var ispan=document.createElement('span');
        ispan.className='bits-appbar-ico'; ispan.setAttribute('aria-hidden','true'); ispan.textContent=section.icon;
        var lspan=document.createElement('span');
        lspan.className='bits-appbar-label'; lspan.textContent=section.label;
        btn.appendChild(ispan); btn.appendChild(lspan);
        btn.addEventListener('click',function(){ openSheet(section); });
        bar.appendChild(btn);
        buttons.push({btn:btn,li:section.li});
      })(sections[k]);
    }

    close.addEventListener('click',closeSheet);
    backdrop.addEventListener('click',closeSheet);
    document.body.appendChild(backdrop);
    document.body.appendChild(sheet);
    document.body.appendChild(bar);

    window.__syncAppbarActive=function(){
      var cur=window.location.pathname;
      for(var q=0;q<buttons.length;q++){
        var subs=buttons[q].li.querySelectorAll('li > a');
        var on=false;
        for(var r=0;r<subs.length;r++){
          if((subs[r].getAttribute('href')||'')===cur) on=true;
        }
        if(!on) on=buttons[q].li.classList.contains('active');
        buttons[q].btn.classList.toggle('active',on);
      }
    };
    window.__syncAppbarActive();
  }
  function decorate(){
    ensureBrand(); ensureToggle(); decorateDevIcons(); decorateStatus(); decorateFlow(); relayoutTitle();
    var links=document.querySelectorAll('#mainmenu a');
    for(var i=0;i<links.length;i++){
      var a=links[i];
      if(a.closest&&a.closest('.bits-brand')) continue;
      if(a.querySelector('.bits-ico')) continue;
      var txt=(a.textContent||'').trim();
      if(!txt) continue;
      var s=document.createElement('span');
      s.className='bits-ico'; s.setAttribute('aria-hidden','true');
      s.textContent=iconFor(txt,a.getAttribute('href')||'');
      a.insertBefore(s,a.firstChild);
    }
    ensureAppbar();
    if(window.__syncAppbarActive){ try{window.__syncAppbarActive();}catch(e){} }
  }
  var tries=0;
  var iv=setInterval(function(){ try{decorate();}catch(e){} if(++tries>20) clearInterval(iv); },500);
  document.addEventListener('DOMContentLoaded',decorate);
  if(document.readyState!=='loading') decorate();
  if(window.MutationObserver){
    var mo=new MutationObserver(function(){ try{decorate();}catch(e){} });
    mo.observe(document.documentElement,{childList:true,subtree:true});
  }
})();
