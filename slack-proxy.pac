function FindProxyForURL(url, host) {

   debugPAC ="PAC Debug Information\n";
   debugPAC +="-----------------------------------\n";
   debugPAC +="Machine IP: " + myIpAddress() + "\n";
   debugPAC +="Hostname: " + host + "\n";
   if (isResolvable(host)) {resolvableHost = "True"} else {resolvableHost = "False"};
    debugPAC +="Host Resolvable: " + resolvableHost + "\n";
    debugPAC +="Hostname IP: " + dnsResolve(host) + "\n";
    if (isPlainHostName(host)) {plainHost = "True"} else {plainHost = "False"};
    debugPAC +="Plain Hostname: " + plainHost + "\n";
    debugPAC +="Domain Levels: " + dnsDomainLevels(host) + "\n";
    debugPAC +="URL: " + url + "\n";

    // Protocol can only be determined by reading the entire URL.
    if (url.substring(0,5)=="http:") {protocol="HTTP";} else
        if (url.substring(0,6)=="https:") {protocol="HTTPS";} else
           if (url.substring(0,4)=="ftp:") {protocol="FTP";}
                else {protocol="Unknown";}
    debugPAC +="Protocol: " + protocol + "\n";

    // Reduce volume of alerts to a useable level, e.g. only alert on static text pages.
    if (!shExpMatch(url,"*.(js|xml|ico|gif|png|jpg|jpeg|css|swf)*")) {alert(debugPAC);}

    if (shExpMatch(host, "*.slack-msgs.com")) {        
        // Use SOCK proxy, or fall back to a DIRECT traffic.
        // ssh -D 8000 [user]@[server]
        return "SOCKS 127.0.0.1:8000; DIRECT";
    }

    return "DIRECT";
}
