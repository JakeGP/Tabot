chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {
    greeting: "get-status"
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "STATUS-ON") {
      on();
    }
    if (request.greeting == "STATUS-OFF") {
      off();
    }
  }
);

var blacklist;
updateBlacklist();
addClickHandlers();



function addClickHandlers() {
  $("#toggle").click(function() {
    if ($("#toggle").prop('checked') == true) {
      saveVariable("ON");
      on();
    } else {
      saveVariable("OFF");
      off();
    }
  });
  $("#add-button").click(function() {
    addBlacklist();
  });
  $(document).on('click', '.blacklistRemove', function(element) {
    removeBlacklist(element.currentTarget);
  });
  $("#blacklistEntry").on('focus', function() {
    $(".tooltip").slideDown();
  });
  $("#blacklistEntry").on('blur', function() {
    $(".tooltip").slideUp();
  });
  $("#suggestiontitle").click(function() {
    $("#suggestionbox").slideToggle();
  });
  $("#suggestion-send").click(function() {
    $("#suggestionbox").slideUp();
  });
}

function testMessage() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      greeting: "fill form"
    }, function(response) {
      console.log(response.farewell);
    });
  });
}

function sendUpdateMessage() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      greeting: "refresh"
    });
  });
}

function saveVariable(value) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      greeting: value
    });
  });
}

function addBlacklist() {
  if($("#blacklistEntry").val() != "") {
    blacklist.push($("#blacklistEntry").val());
  }

  chrome.storage.sync.set({
      blacklistList:blacklist
  }, function() {
    $("#blacklistEntry").val("");
    updateBlacklist();
  });

  sendUpdateMessage();
}

function removeBlacklist(element) {
  var name = $(element).siblings('.blacklistTitle').html();
  var index = blacklist.indexOf(name);
  if (index >= 0) {
    blacklist.splice( index, 1 );
  }
  if(blacklist.length == 1 && blacklist[0] == "") {
    clearBlacklist();
  }
  addBlacklist();
}

function updateBlacklist() {
  $("#blacklistList").html("");
  chrome.storage.sync.get({blacklistList:[]}, function(items) {
    blacklist = items.blacklistList;

    for(var i = 0; i < items.blacklistList.length; i++) {
      $("#blacklistList").append("<li class='blacklistItem'><p class='blacklistTitle'>" + items.blacklistList[i] + "</p><div class='blacklistRemove'><p>-</p></div>")
    }
  });
}

function clearBlacklist() {
  blacklist = [];
  chrome.storage.sync.set({
      blacklistList:blacklist
  }, function() {
    updateBlacklist();
  });
}

function on() {
  $("#toggle").prop("checked", true);
  chrome.browserAction.setIcon({path:"icon_128.png"});
}
function off() {
  $("#toggle").prop("checked", false);
  chrome.browserAction.setIcon({path:"icon_128_grayscale.png"});
}
