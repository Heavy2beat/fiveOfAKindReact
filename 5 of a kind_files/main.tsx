import __vite__cjsImport0_react_jsxDevRuntime from "/fiveOfAKindReact/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=400eead0"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/fiveOfAKindReact/node_modules/.vite/deps/react.js?v=400eead0"; const StrictMode = __vite__cjsImport1_react["StrictMode"];
import __vite__cjsImport2_reactDom_client from "/fiveOfAKindReact/node_modules/.vite/deps/react-dom_client.js?v=400eead0"; const createRoot = __vite__cjsImport2_reactDom_client["createRoot"];
import "/fiveOfAKindReact/src/index.css?t=1738921803128";
import { App } from "/fiveOfAKindReact/src/app.tsx";
import { createHashRouter, RouterProvider } from "/fiveOfAKindReact/node_modules/.vite/deps/react-router-dom.js?v=400eead0";
import End from "/fiveOfAKindReact/src/pages/End.tsx";
import Game from "/fiveOfAKindReact/src/pages/Game.tsx";
import Start from "/fiveOfAKindReact/src/pages/Start.tsx";
import NotFoundPage from "/fiveOfAKindReact/src/pages/NotFoundPage.tsx";
import Highscores from "/fiveOfAKindReact/src/pages/Highscores.tsx?t=1738921803128";
const router = createHashRouter(
  [
    {
      path: "/",
      element: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
        fileName: "C:/Users/Fabian/Desktop/Coding/Hundeschule-React/fiveOfAKindReact/src/main.tsx",
        lineNumber: 16,
        columnNumber: 12
      }, this),
      errorElement: /* @__PURE__ */ jsxDEV(NotFoundPage, {}, void 0, false, {
        fileName: "C:/Users/Fabian/Desktop/Coding/Hundeschule-React/fiveOfAKindReact/src/main.tsx",
        lineNumber: 17,
        columnNumber: 17
      }, this),
      children: [
        {
          path: "",
          element: /* @__PURE__ */ jsxDEV(Start, {}, void 0, false, {
            fileName: "C:/Users/Fabian/Desktop/Coding/Hundeschule-React/fiveOfAKindReact/src/main.tsx",
            lineNumber: 21,
            columnNumber: 14
          }, this)
        },
        {
          path: "/game",
          element: /* @__PURE__ */ jsxDEV(Game, {}, void 0, false, {
            fileName: "C:/Users/Fabian/Desktop/Coding/Hundeschule-React/fiveOfAKindReact/src/main.tsx",
            lineNumber: 25,
            columnNumber: 14
          }, this)
        },
        {
          path: "/end",
          element: /* @__PURE__ */ jsxDEV(End, {}, void 0, false, {
            fileName: "C:/Users/Fabian/Desktop/Coding/Hundeschule-React/fiveOfAKindReact/src/main.tsx",
            lineNumber: 29,
            columnNumber: 14
          }, this)
        },
        {
          path: "/highscores",
          element: /* @__PURE__ */ jsxDEV(Highscores, {}, void 0, false, {
            fileName: "C:/Users/Fabian/Desktop/Coding/Hundeschule-React/fiveOfAKindReact/src/main.tsx",
            lineNumber: 33,
            columnNumber: 14
          }, this)
        }
      ]
    }
  ]
);
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(StrictMode, { children: /* @__PURE__ */ jsxDEV(RouterProvider, { router }, void 0, false, {
    fileName: "C:/Users/Fabian/Desktop/Coding/Hundeschule-React/fiveOfAKindReact/src/main.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "C:/Users/Fabian/Desktop/Coding/Hundeschule-React/fiveOfAKindReact/src/main.tsx",
    lineNumber: 42,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBZWE7QUFmYixTQUFTQSxrQkFBa0I7QUFDM0IsU0FBU0Msa0JBQWtCO0FBQzNCLE9BQU87QUFDUCxTQUFTQyxXQUFXO0FBQ3BCLFNBQVNDLGtCQUFrQkMsc0JBQXNCO0FBQ2pELE9BQU9DLFNBQVM7QUFDaEIsT0FBT0MsVUFBVTtBQUNqQixPQUFPQyxXQUFXO0FBQ2xCLE9BQU9DLGtCQUFrQjtBQUN6QixPQUFPQyxnQkFBZ0I7QUFFdkIsTUFBTUMsU0FBU1A7QUFBQUEsRUFBaUI7QUFBQSxJQUM5QjtBQUFBLE1BRUVRLE1BQU07QUFBQSxNQUNOQyxTQUFTLHVCQUFDLFNBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFLO0FBQUEsTUFDZEMsY0FBYyx1QkFBQyxrQkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQWE7QUFBQSxNQUMzQkMsVUFBVTtBQUFBLFFBQ1I7QUFBQSxVQUNFSCxNQUFNO0FBQUEsVUFDTkMsU0FBUyx1QkFBQyxXQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQU87QUFBQSxRQUNsQjtBQUFBLFFBQ0E7QUFBQSxVQUNFRCxNQUFNO0FBQUEsVUFDTkMsU0FBUyx1QkFBQyxVQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQU07QUFBQSxRQUNqQjtBQUFBLFFBQ0E7QUFBQSxVQUNFRCxNQUFNO0FBQUEsVUFDTkMsU0FBUyx1QkFBQyxTQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQUs7QUFBQSxRQUNoQjtBQUFBLFFBQ0E7QUFBQSxVQUNFRCxNQUFNO0FBQUEsVUFDTkMsU0FBUyx1QkFBQyxnQkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFZO0FBQUEsUUFFdkI7QUFBQSxNQUFDO0FBQUEsSUFFTDtBQUFBLEVBQUM7QUFFRjtBQUVEWCxXQUFXYyxTQUFTQyxlQUFlLE1BQU0sQ0FBRSxFQUFFQztBQUFBQSxFQUMzQyx1QkFBQyxjQUNDLGlDQUFDLGtCQUFlLFVBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBZ0MsS0FEbEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUVBO0FBQ0YiLCJuYW1lcyI6WyJTdHJpY3RNb2RlIiwiY3JlYXRlUm9vdCIsIkFwcCIsImNyZWF0ZUhhc2hSb3V0ZXIiLCJSb3V0ZXJQcm92aWRlciIsIkVuZCIsIkdhbWUiLCJTdGFydCIsIk5vdEZvdW5kUGFnZSIsIkhpZ2hzY29yZXMiLCJyb3V0ZXIiLCJwYXRoIiwiZWxlbWVudCIsImVycm9yRWxlbWVudCIsImNoaWxkcmVuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJtYWluLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHJpY3RNb2RlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tIFwicmVhY3QtZG9tL2NsaWVudFwiO1xyXG5pbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xyXG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9hcHBcIjtcclxuaW1wb3J0IHsgY3JlYXRlSGFzaFJvdXRlciwgUm91dGVyUHJvdmlkZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQgRW5kIGZyb20gXCIuL3BhZ2VzL0VuZFwiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9wYWdlcy9HYW1lXCI7XHJcbmltcG9ydCBTdGFydCBmcm9tIFwiLi9wYWdlcy9TdGFydFwiO1xyXG5pbXBvcnQgTm90Rm91bmRQYWdlIGZyb20gXCIuL3BhZ2VzL05vdEZvdW5kUGFnZVwiO1xyXG5pbXBvcnQgSGlnaHNjb3JlcyBmcm9tIFwiLi9wYWdlcy9IaWdoc2NvcmVzXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBjcmVhdGVIYXNoUm91dGVyKFtcclxuICB7XHJcbiAgICBcclxuICAgIHBhdGg6IFwiL1wiLFxyXG4gICAgZWxlbWVudDogPEFwcD48L0FwcD4sXHJcbiAgICBlcnJvckVsZW1lbnQ6IDxOb3RGb3VuZFBhZ2UgLz4sXHJcbiAgICBjaGlsZHJlbjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgcGF0aDogXCJcIixcclxuICAgICAgICBlbGVtZW50OiA8U3RhcnQ+PC9TdGFydD4sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwYXRoOiBcIi9nYW1lXCIsXHJcbiAgICAgICAgZWxlbWVudDogPEdhbWU+PC9HYW1lPixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHBhdGg6IFwiL2VuZFwiLFxyXG4gICAgICAgIGVsZW1lbnQ6IDxFbmQ+PC9FbmQ+LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcGF0aDogXCIvaGlnaHNjb3Jlc1wiLFxyXG4gICAgICAgIGVsZW1lbnQ6IDxIaWdoc2NvcmVzPjwvSGlnaHNjb3Jlcz5cclxuXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgXHJcbl0pO1xyXG5cclxuY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikhKS5yZW5kZXIoXHJcbiAgPFN0cmljdE1vZGU+XHJcbiAgICA8Um91dGVyUHJvdmlkZXIgcm91dGVyPXtyb3V0ZXJ9PjwvUm91dGVyUHJvdmlkZXI+XHJcbiAgPC9TdHJpY3RNb2RlPixcclxuKTtcclxuIl0sImZpbGUiOiJDOi9Vc2Vycy9GYWJpYW4vRGVza3RvcC9Db2RpbmcvSHVuZGVzY2h1bGUtUmVhY3QvZml2ZU9mQUtpbmRSZWFjdC9zcmMvbWFpbi50c3gifQ==