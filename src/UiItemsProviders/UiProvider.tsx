import { ColorDef } from '@itwin/core-common';
import { IModelApp } from '@itwin/core-frontend';
import {
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  UiItemsProvider,
  Widget,
} from '@itwin/appui-react';
import { ToggleSwitch } from "@itwin/itwinui-react";

export class UiProvider implements UiItemsProvider {
  public readonly id = 'ProviderId';
  public static toggledOnce: boolean = false;
  public static originalColor: number;

  public provideWidgets(
    _stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ): ReadonlyArray<Widget> {
    const widgets: Widget[] = [];
    if (
      stageUsage === StageUsage.General &&
      location === StagePanelLocation.Right &&
      section === StagePanelSection.Start
    ) {
      const backgroundColorWidget: Widget = {
        id: 'BackgroundColorWidget',
        label: 'Background Color Toggle',
        content: <ToggleSwitch
          onChange={(e) => {
            if (UiProvider.toggledOnce === false) {
              UiProvider.originalColor =
                IModelApp.viewManager.selectedView!.displayStyle.backgroundColor.tbgr;
              UiProvider.toggledOnce = true;
            }
            const color = e.target.checked
              ? ColorDef.computeTbgrFromString("white")
              : UiProvider.originalColor;
  
            IModelApp.viewManager.selectedView!.overrideDisplayStyle({
              backgroundColor: color,
            });
          }}
        /> 
      };

      widgets.push(backgroundColorWidget);
    }
    return widgets;
  }
}