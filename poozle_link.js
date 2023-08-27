!(function () {
  "use strict";
  var e = document.createElement("iframe"),
    n = {
      isLinkOpen: !1,
      linkId: null,
      accountIdentifier: void 0,
      redirectURL: void 0,
      baseURL: "https://app.poozle.dev",
      isIFrameCreated: !1,
      isIFrameReady: !1,
      onValidationError: function () {},
      onExit: function () {},
      onSuccess: function () {},
      onIFrameReady: function () {},
      savedBodyStyles: { overflow: "auto", height: "auto" },
    },
    i = function () {
      e.contentWindow &&
        e.contentWindow.postMessage(
          {
            messageType: "SEND_INFO_TO_IFRAME",
            linkId: n.linkId || "0",
            accountIdentifier: n.accountIdentifier,
            redirectURL: n.redirectURL,
            isLinkOpen: n.isLinkOpen,
          },
          "*"
        );
    };
  window.addEventListener("message", function (e) {
    var o = e.data,
      a = o.messageType,
      d = o.validationErrors;
    switch (a) {
      case "SEND_VALIDATION_ERRORS_TO_PARENT":
        d && d.length && n.onValidationError(d);
        break;
      case "LINKING_FLOW_READY_FOR_LINK_TOKEN":
        (n.isIFrameReady = !0), n.onIFrameReady(), i();
        break;
      case "CLOSE_LINKING_FLOW":
        t(), n.onExit && n.onExit();
    }
  });
  var t = function () {
    (document.body.style.margin = n.savedBodyStyles.margin),
      (e.style.display = "none"),
      (n.isLinkOpen = !1),
      e.contentWindow &&
        e.contentWindow.postMessage({ messageType: "EXIT_MERGE_LINK" }, "*");
  };
  window.PoozleLink = {
    initialize: function (t) {
      if (
        ((n.linkId = t.linkId),
        (n.accountIdentifier = t.accountIdentifier),
        (n.redirectURL = t.redirectURL),
        t.baseURL && (n.baseURL = t.baseURL),
        (n.onValidationError = t.onValidationError || function () {}),
        (n.onSuccess = t.onSuccess || function () {}),
        (n.onIFrameReady = t.onReady || function () {}),
        (n.onExit = t.onExit || function () {}),
        !n.isIFrameCreated)
      ) {
        n.isIFrameCreated = !0;
        var o = "",
          a = "";
        n.accountIdentifier && (o = `accountIdentifier=${o}`),
          n.redirectURL && (a = o ? `&redirectURL=${a}` : `redirectURL=${a}`),
          (e.src = `${n.baseURL}/link/frame/${n.linkId}?${o}${a}`),
          (e.style.display = "none"),
          document.body.appendChild(e);
      }
      n.isIFrameReady && n.onIFrameReady();
    },
    openLink: function (t) {
      (n.isLinkOpen = !0),
        n.linkId
          ? i()
          : e.contentWindow &&
            e.contentWindow.postMessage(
              { messageType: "SEND_INFO_TO_IFRAME", isLinkOpen: n.isLinkOpen },
              "*"
            ),
        (e.style.display = "block"),
        (e.style.width = "100vw"),
        (e.style.height = "100vh"),
        (e.style.position = "fixed"),
        (e.style.top = 0),
        (n.savedBodyStyles = { margin: document.body.style.margin }),
        (document.body.style.margin = 0);
    },
    closeLink: t,
  };
})();
