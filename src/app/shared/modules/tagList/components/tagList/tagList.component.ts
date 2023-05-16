import {Component, Input} from "@angular/core"
import {PopularTagType} from "../../../../types/popularTag.type"

@Component({
  selector: "mc-tag-list",
  templateUrl: "./tagList.component.html",
  styles: [
    `
      .tag-list {
        display: flex;
        justify-content: flex-end;
      }
    `
  ]
})
export class TagListComponent {
  @Input("tags") tagsProps: PopularTagType[]
}
