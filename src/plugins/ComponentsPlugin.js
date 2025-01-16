export const ComponentsPlugin = (system) => {
    return {
      statePlugins: {
        spec: {
          selectors: {
            getUIComponents: (state) => {
              const spec = state.get("json", {}).toJS();
              return Object.entries(spec?.components?.schemas || {})
                .filter(([key]) => key.startsWith("UI."))
                .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
            }
          }
        }
      },
      components: {
        UIComponents: ({ getComponent }) => {
          const uiComponents = system.getSystem().specSelectors.getUIComponents();
  
          if (Object.keys(uiComponents).length === 0) return null;
  
          return system.React.createElement("section", { className: "models" },
            system.React.createElement("h4", {}, system.React.createElement("button", {className:"models-control"}, "UI Components - Custom Plugin")),
            Object.entries(uiComponents).map(([name, schema]) => 
              system.React.createElement("div", { key: name, className: "model-container" },
                system.React.createElement("span", { className: "model-box" }, name),
                system.React.createElement("div", { className: "model-description" }, 
                  schema.description
                )
              )
            )
          );
        }
      },
      wrapComponents: {
        Models: (Original, { React }) => (props) => {
          const UIComponents = system.getComponent("UIComponents");
          return React.createElement("div", {},
            React.createElement(UIComponents),
            React.createElement(Original, props)
          );
        }
      }
    };
  };