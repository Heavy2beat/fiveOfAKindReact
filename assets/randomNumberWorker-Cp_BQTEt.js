(function(){"use strict";self.onmessage=function(){try{const s=Math.floor(Math.random()*6+1);self.postMessage(s)}catch(s){self.postMessage({error:s.message})}}})();
