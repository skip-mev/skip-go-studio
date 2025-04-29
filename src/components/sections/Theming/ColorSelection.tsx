import { useStudioStore } from "@/store/studio";
import { ColorSelectionButton } from "./ColorSelectionButton";

export const ColorSelection = () => {
  const { theme } = useStudioStore();

  return (
    <div className="flex flex-col gap-4">
      <ColorSelectionButton
        title="Brand"
        value={theme.brandColor}
        onSave={(color) => {
          useStudioStore.setState({
            theme: {
              ...theme,
              brandColor: color,
            },
          });
        }}
      />
      <ColorSelectionButton
        title="Brand text"
        value={theme.brandTextColor || "#FFFFFF"}
        onSave={(color) => {
          useStudioStore.setState({
            theme: {
              ...theme,
              brandTextColor: color,
            },
          });
        }}
      />
      <span className="text-xl">Primary</span>
      <div className="flex flex-col gap-4 pl-4">
        <ColorSelectionButton
          title="Background"
          value={theme.primary.background.normal}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                primary: {
                  ...theme.primary,
                  background: {
                    ...theme.primary.background,
                    normal: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Text normal"
          value={theme.primary.text.normal}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                primary: {
                  ...theme.primary,
                  text: {
                    ...theme.primary.text,
                    normal: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Text low contrast"
          value={theme.primary.text.lowContrast}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                primary: {
                  ...theme.primary,
                  text: {
                    ...theme.primary.text,
                    lowContrast: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Text ultra low contrast"
          value={theme.primary.text.ultraLowContrast}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                primary: {
                  ...theme.primary,
                  text: {
                    ...theme.primary.text,
                    ultraLowContrast: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Ghost button hover"
          value={theme.primary.ghostButtonHover}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                primary: {
                  ...theme.primary,
                  ghostButtonHover: color,
                },
              },
            });
          }}
        />
      </div>
      <span className="text-xl">Secondary</span>
      <div className="flex flex-col gap-4 pl-4">
        <ColorSelectionButton
          title="Background normal"
          value={theme.secondary.background.normal}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                secondary: {
                  ...theme.secondary,
                  background: {
                    ...theme.secondary.background,
                    normal: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Background hover"
          value={theme.secondary.background.hover}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                secondary: {
                  ...theme.secondary,
                  background: {
                    ...theme.secondary.background,
                    hover: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Background transparent"
          value={theme.secondary.background.transparent}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                secondary: {
                  ...theme.secondary,
                  background: {
                    ...theme.secondary.background,
                    transparent: color,
                  },
                },
              },
            });
          }}
        />
      </div>

      <span className="text-xl">Error</span>
      <div className="flex flex-col gap-4 pl-4">
        <ColorSelectionButton
          title="Background"
          value={theme.error.background}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                error: {
                  ...theme.error,
                  background: color,
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Text"
          value={theme.error.text}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                error: {
                  ...theme.error,
                  text: color,
                },
              },
            });
          }}
        />
      </div>

      <span className="text-xl">Warning</span>
      <div className="flex flex-col gap-4 pl-4">
        <ColorSelectionButton
          title="Background"
          value={theme.warning.background}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                warning: {
                  ...theme.warning,
                  background: color,
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Text"
          value={theme.warning.text}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                warning: {
                  ...theme.warning,
                  text: color,
                },
              },
            });
          }}
        />
      </div>

      <ColorSelectionButton
        title="Success text"
        value={theme.success.text}
        onSave={(color) => {
          useStudioStore.setState({
            theme: {
              ...theme,
              success: {
                text: color,
              },
            },
          });
        }}
      />
    </div>
  );
};
