$(document).ready(function(){
  getBlacklist();
  getStatus();
});

var blacklist;

function walk(node) {
  // I stole this function from here:
  // http://is.gd/mwZp7E
  if(isUrlBlacklisted(window.location.href)) {
    var child, next;

    switch (node.nodeType) {
      case 1: // Element
      case 9: // Document
      case 11: // Document fragment
        child = node.firstChild;
        while (child) {
          next = child.nextSibling;
          walk(child);
          child = next;
        }
        break;

      case 3: // Text node
        if (node.parentElement.tagName.toLowerCase() != "script") {
          handleText(node);
        }
        break;
    }
  }

  function handleText(textNode) {
    var v = textNode.nodeValue;

    if (v.match(/\b(thanks|thank you|taa|ta|cheers|)\b/gi)) {
      v = v.replace(/\b(thanks|thank you|taa|ta)\b/gi,'tabud');
    }
    if (v.match(/\b(please)\b/gi)) {
      v = v.replace(/\b(please)\b/gi, 'ta');
    }
    if (v.match(/\b(what's that|what is that|whats that)\b/gi)) {
      v = v.replace(/\b(what's that|what is that|whats that|what)\b/gi, 'wossat');
    }
    if (v.match(/\b(what)\b/gi)) {
      v = v.replace(/\b(what)\b/gi, 'wot');
    }
    if (v.match(/\b(Josh)\b/gi)) {
      v = v.replace(/\b(Josh)\b/gi, 'our Josh');
    }
    if (v.match(/\b(Toby)\b/gi)) {
      v = v.replace(/\b(Toby)\b/gi, 'our Toby');
    }
    if (v.match(/\b(he|him)\b/gi)) {
      v = v.replace(/\b(he)\b/gi, 'our lad');
    }
    if (v.match(/\b(his)\b/gi)) {
      v = v.replace(/\b(his)\b/gi, 'is');
    }
    if (v.match(/\b(she)\b/gi)) {
      v = v.replace(/\b(she)\b/gi, 'our lass');
    }
    if (v.match(/\b(her)\b/gi)) {
      v = v.replace(/\b(her)\b/gi, 'er');
    }
    if (v.match(/(hmm)\b/gi)) {
      v = v.replace(/\b(hmm)\b/gi, 'bbbbrp');
    }
    if (v.match(/\b(anything)\b/gi)) {
      v = v.replace(/\b(anything)\b/gi, 'owt');
    }
    if (v.match(/\b(nothing)\b/gi)) {
      v = v.replace(/\b(nothing)\b/gi, 'nowt');
    }
    if (v.match(/\b(internet)\b/gi)) {
      v = v.replace(/\b(internet)\b/gi, 'tinternet');
    }
    if (v.match(/\b(holiday)/gi)) {
      v = v.replace(/\b(holiday)/gi, 'holibob');
    }
    if (v.match(/\b(hello)\b/gi)) {
      v = v.replace(/\b(hello)\b/gi, 'ey up');
    }
    if (v.match(/\b(look)\b/gi)) {
      v = v.replace(/\b(look)\b/gi, 'gander');
    }
    if (v.match(/\b(nothing)\b/gi)) {
      v = v.replace(/\b(nothing)\b/gi, 'nowt');
    }
    if (v.match(/\b(very)\b/gi)) {
      v = v.replace(/\b(very)\b/gi, 'right');
    }
    if (v.match(/\b(chocolate)\b/gi)) {
      v = v.replace(/\b(chocolate)\b/gi, 'choccy');
    }
    if (v.match(/\b(biscuit)\b/gi)) {
      v = v.replace(/\b(biscuit)\b/gi, 'biccy');
    }
    if (v.match(/\b(biscuits)\b/gi)) {
      v = v.replace(/\b(biscuits)\b/gi, 'biccys');
    }
    if (v.match(/\b(chocolate biscuits)\b/gi)) {
      v = v.replace(/\b(biscuits)\b/gi, 'choccy biccys');
    }
    if (v.match(/\b(does not)\b/gi)) {
      v = v.replace(/\b(does not)\b/gi, 'dont');
    }
    if (v.match(/\b(am not|is not)\b/gi)) {
      v = v.replace(/\b(am not|is not)\b/gi, 'no');
    }
    if (v.match(/\b(don't know|dont know|no idea)\b/gi)) {
      v = v.replace(/\b(don't know|dont know|no idea)\b/gi,'dunno');
    }
    if (v.match(/\b(going)\b/gi)) {
      v = v.replace(/\b(going)\b/gi, 'goin');
    }
    if (v.match(/\b(have)\b/gi)) {
      v = v.replace(/\b(have)\b/gi, 'ave');
    }
    if (v.match(/\b(havent|haven't)\b/gi)) {
      v = v.replace(/\b(havent|haven't)\b/gi, 'avent');
    }
    if (v.match(/\b(here)\b/gi)) {
      v = v.replace(/\b(here)\b/gi, 'ere');
    }
    if (v.match(/\b(here's|heres)\b/gi)) {
      v = v.replace(/\b(the)\b/gi, 'eres');
    }
    if (v.match(/\b(and)\b/gi)) {
      v = v.replace(/\b(and)\b/gi, 'an');
    }
    if (v.match(/\b(friend|buddy|pal|mate|guy|dude|acquaintance|amigo)\b/gi)) {
      v = v.replace(/\b(friend|buddy|pal|mate|guy|dude|acquaintance|amigo)\b/gi,'bud');
    }
    if (v.match(/\b(my)\b/gi)) {
      v = v.replace(/\b(my)\b/gi, 'ma');
    }
    if (v.match(/\b(about)\b/gi)) {
      v = v.replace(/\b(about)\b/gi, 'bout');
    }
    if (v.match(/\b(to|the|a|that)\b/gi)) {
      v = v.replace(/\b(to|the|a)\b/gi, ' ');
    }
    if (v.match(/\b(?!holiday|holibob|holibobmaker|holidaymaker|hand|happening|having\b)(h)/gi)) {
      v = v.replace(/\b(?!holiday|holibob|holibobmaker|holidaymaker|hand|happening|having\b)(h)/gi, "'");
    }
    if (v.match(/\b(around)\b/gi)) {
      v = v.replace(/\b(around)\b/gi, 'round');
    }
    if (v.match(/\b(my)\b/gi)) {
      v = v.replace(/\b(my)\b/gi, 'ma');
    }
    if (v.match(/\b(was)\b/gi)) {
      v = v.replace(/\b(was)\b/gi, 'were');
    }
    if (v.match(/\b(happening)\b/gi)) {
      v = v.replace(/\b(happening)\b/gi, 'appn');
    }
    if (v.match(/\b(something)\b/gi)) {
      v = v.replace(/\b(something)\b/gi, 'summin');
    }
    if (v.match(/\b(having)\b/gi)) {
      v = v.replace(/\b(having)/gi, 'avin');
    }
    if (v.match(/\b(father)\b/gi)) {
     v = v.replace(/\b(father)\b/gi, 'old man');
    }
    if (v.match(/\b(dad)\b/gi)) {
     v = v.replace(/\b(dad)\b/gi, 'old man');
    }
    if (v.match(/\b(wife)\b/gi)) {
     v = v.replace(/\b(wife)\b/gi, 'missus');
    }
    if (v.match(/\b(mother)\b/gi)) {
     v = v.replace(/\b(mother)\b/gi, 'mum');
    }
    if (v.match(/\b(would)\b/gi)) {
     v = v.replace(/\b(would)\b/gi, 'might');
    }
    if (v.match(/\b(nobody)\b/gi)) {
     v = v.replace(/\b(nobody)\b/gi, 'aint nobody');
    }
    if (v.match(/\b(other)\b/gi)) {
     v = v.replace(/\b(other)\b/gi, 'tother');
    }
    if (v.match(/\b(upset)\b/gi)) {
     v = v.replace(/\b(upset)\b/gi, 'mithered');
    }
    if (v.match(/\b(bothered)\b/gi)) {
     v = v.replace(/\b(bothered)\b/gi, 'mithered');
    }
    if (v.match(/\b(angry)\b/gi)) {
     v = v.replace(/\b(angry)\b/gi, 'mardy');
    }
    if (v.match(/\b(son)\b/gi)) {
     v = v.replace(/\b(son)\b/gi, 'younglad');
    }
    if (v.match(/\b(daughter)\b/gi)) {
     v = v.replace(/\b(daughter)\b/gi, 'younglass');
    }
    if (v.match(/\b(sons)\b/gi)) {
     v = v.replace(/\b(sons)\b/gi, 'younglads');
    }
    if (v.match(/\b(daughters)\b/gi)) {
     v = v.replace(/\b(daughters)\b/gi, 'younglasses');
    }
    if (v.match(/\b(often)\b/gi)) {
     v = v.replace(/\b(often)\b/gi, 'oftentimes');
    }
    if (v.match(/\b(facebook)\b/gi)) {
     v = v.replace(/\b(facebook)\b/gi, 'tfacebook');
    }
    if (v.match(/\b(myself)\b/gi)) {
     v = v.replace(/\b(myself)\b/gi, 'meself');
    }

    textNode.nodeValue = v;
  }
}

function getStatus() {
  chrome.storage.sync.get({status:[]}, function(items) {
    var status = items.status;
    if (items.status == "ON") {
      walk(document.body);
    }
    if (items.status == "") {
      status = "ON";
      chrome.storage.sync.set({status: status}, function() {});
      walk(document.body);
    }
    if (items.status == "OFF") {
      status = "OFF";
      chrome.storage.sync.set({status: status}, function() {});
    }

    console.log(items.status);

    chrome.runtime.sendMessage({
      greeting: "STATUS-" + status
    }, function() {});
  });
}

function getBlacklist() {
  chrome.storage.sync.get({blacklistList:[]}, function(items) {
    blacklist = items.blacklistList;
    console.log(items.blacklistList);
  });
}

function isUrlBlacklisted(url) {
  for(var i = 0; i < blacklist.length; i++) {
    if(url.includes(blacklist[i])) {
      return false;
    }
  }
  return true;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "ON") {
      chrome.storage.sync.set({status: "ON"}, function() {});
      walk(document.body);
    }
    if (request.greeting == "OFF") {
      chrome.storage.sync.set({status: "OFF"}, function() {});
      location.reload();
    }
    if (request.greeting == "get-status") {
      getStatus();
    }
    if (request.greeting == "refresh") {
      getBlacklist();
    }
  }
);
