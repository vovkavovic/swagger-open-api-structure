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
          const [expandedComponent, setExpandedComponent] = system.React.useState(null);
  
          if (Object.keys(uiComponents).length === 0) return null;
  
          return system.React.createElement("section", { className: "models is-open" },
            // Header
            system.React.createElement("h4", {},
              system.React.createElement("button", {
                className: "models-control",
                "aria-expanded": true
              }, 
                system.React.createElement("span", {}, "UI Components - Custom UI Plugin that renders components")
              )
            ),
            // Components List
            system.React.createElement("div", { className: "models-control-group" },
              Object.entries(uiComponents).map(([name, schema]) =>
                system.React.createElement("div", { 
                  key: name, 
                  className: `model-container ${expandedComponent === name ? 'is-open' : ''}`
                },
                  // Component Header
                  system.React.createElement("span", { className: "model" },
                    system.React.createElement("button", {
                      className: "model-box",
                      "aria-expanded": expandedComponent === name,
                      onClick: () => setExpandedComponent(expandedComponent === name ? null : name)
                    },
                      system.React.createElement("span", { className: "model-toggle collapsed" }),
                      system.React.createElement("span", { className: "model-title" }, name)
                    )
                  ),
                  // Component Content
                  expandedComponent === name && system.React.createElement("div", { className: "model-box-container" },
                    // Description
                    schema.description && system.React.createElement("div", { className: "model-description" },
                      schema.description
                    ),
                    // Properties Table
                    system.React.createElement("table", { className: "model" },
                      system.React.createElement("thead", {},
                        system.React.createElement("tr", {},
                          system.React.createElement("th", { className: "prop-name" }, "Name"),
                          system.React.createElement("th", { className: "prop-type" }, "Type"),
                          system.React.createElement("th", { className: "prop-desc" }, "Description")
                        )
                      ),
                      system.React.createElement("tbody", {},
                        Object.entries(schema.properties || {}).map(([propName, prop]) =>
                          system.React.createElement("tr", { key: propName },
                            system.React.createElement("td", { className: "prop-name" }, propName),
                            system.React.createElement("td", { className: "prop-type" },
                              prop.type,
                              prop.enum && system.React.createElement("div", { className: "prop-enum" },
                                "Enum: [",
                                prop.enum.map((val, i) => 
                                  system.React.createElement("span", { key: val },
                                    `"${val}"${i < prop.enum.length - 1 ? ", " : ""}`
                                  )
                                ),
                                "]"
                              )
                            ),
                            system.React.createElement("td", { className: "prop-desc" }, prop.description)
                          )
                        )
                      )
                    ),
                    // Example
                    schema.example && system.React.createElement("div", { className: "model-example" },
                      system.React.createElement("div", { className: "model-title" }, "Example"),
                      system.React.createElement("pre", {},
                        JSON.stringify(schema.example, null, 2)
                      )
                    )
                  )
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