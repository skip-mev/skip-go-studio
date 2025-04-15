import { useStudioStore } from "@/store/studio";
import { ColorSelectionButton } from "./ColorSelectionButton";

export const ColorSelection = () => {
  const { theme } = useStudioStore();

  return (
    <div className="flex flex-col gap-4">
      <ColorSelectionButton
        title="Brand color"
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
        title="Brand text color"
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
      <ColorSelectionButton
        title="Primary background color"
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
        title="Primary text color"
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
        title="Primary ghost button hover color"
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
      <ColorSelectionButton
        title="Secondary background color"
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
    </div>
  );
};
