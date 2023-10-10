import { COLOR_HUES, COLOR_TINTS, HSL, config, hslToRgb } from "@sanity/color";

interface VariableNode {
  variable: Variable;
  name: string;
}

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === "variables:sync") {
    const localVariableCollections =
      figma.variables.getLocalVariableCollections();

    for (const collection of localVariableCollections) {
      const variables: VariableNode[] = [];

      for (const variableId of collection.variableIds) {
        const variable = figma.variables.getVariableById(variableId);

        if (variable) {
          variables.push({ variable, name: variable.name });
        }
      }

      _syncFigmaColorVariable({
        collection,
        hsl: config.black.hsl,
        name: "black",
        nodes: variables,
      });

      _syncFigmaColorVariable({
        collection,
        hsl: config.white.hsl,
        name: "white",
        nodes: variables,
      });

      // hues
      for (const hueKey of COLOR_HUES) {
        const { tints } = config[hueKey];

        for (const tintKey of COLOR_TINTS) {
          const tint = tints[tintKey];
          const variableName = `${hueKey}/${tintKey}`;

          _syncFigmaColorVariable({
            collection,
            hsl: tint.hsl,
            name: variableName,
            nodes: variables,
          });
        }
      }
    }
  }

  if (msg.type === "styles:sync") {
    const localStyles = figma.getLocalPaintStyles();

    // black
    _syncFigmaColor({
      localStyles,
      hsl: config.black.hsl,
      title: "Sanity Black",
    });

    // white
    _syncFigmaColor({
      localStyles,
      hsl: config.white.hsl,
      title: "Sanity White",
    });

    // hues
    for (const hueKey of COLOR_HUES) {
      const { tints } = config[hueKey];

      for (const tintKey of COLOR_TINTS) {
        const tint = tints[tintKey];

        const colorTitle = hueKey.slice(0, 1).toUpperCase();
        const styleTitle = `Sanity ${colorTitle}${hueKey.slice(1)}/${tintKey}`;

        _syncFigmaColor({
          localStyles,
          hsl: tint.hsl,
          title: styleTitle,
        });
      }
    }
  }

  figma.closePlugin();
};

function _syncFigmaColor(options: {
  localStyles: PaintStyle[];
  hsl: HSL;
  title: string;
}) {
  const { localStyles, hsl, title } = options;

  const rgb = hslToRgb(hsl);

  const existingStyle = localStyles.find((s) => s.name === title);
  const style = existingStyle || figma.createPaintStyle();

  style.name = title;

  const solid: SolidPaint = {
    type: "SOLID",
    color: {
      r: rgb[0] / 255,
      g: rgb[1] / 255,
      b: rgb[2] / 255,
    },
  };

  style.paints = [solid];
}

function _syncFigmaColorVariable(options: {
  collection: VariableCollection;
  hsl: HSL;
  name: string;
  nodes: VariableNode[];
}) {
  const { collection, hsl, name, nodes } = options;
  const rgb = hslToRgb(hsl);
  const node = nodes.find((v) => v.name === name);
  const modeId = collection.modes[0].modeId;

  if (!modeId) {
    throw new Error("No modeId");
  }

  if (node) {
    console.log("update", name);

    node.variable.setValueForMode(modeId, {
      r: rgb[0] / 255,
      g: rgb[1] / 255,
      b: rgb[2] / 255,
    });
  } else {
    console.log("create", name);

    const variable = figma.variables.createVariable(
      name,
      collection.id,
      "COLOR"
    );

    variable.setValueForMode(modeId, {
      r: rgb[0] / 255,
      g: rgb[1] / 255,
      b: rgb[2] / 255,
    });
  }
}
