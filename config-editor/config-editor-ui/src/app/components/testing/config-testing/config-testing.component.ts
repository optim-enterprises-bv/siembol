import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditorService } from '@app/services/editor.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyForm } from '@ngx-formly/core';
import { ConfigTestResult, TestingType, TestConfigSpec, DEFAULT_CONFIG_TESTER_NAME } from '../../../model/config-model';
import { take } from 'rxjs/operators';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { SchemaService } from '@app/services/schema/schema.service';

@Component({
  selector: 're-config-testing',
  templateUrl: './config-testing.component.html',
  styleUrls: ['./config-testing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTestingComponent implements OnInit {
  testInput: any = {};

  field: FormlyFieldConfig;
  options: FormlyFormOptions = {};
  @Input() testingType: TestingType;
  public form: FormGroup = new FormGroup({});
  public isInvalid = false;
  public output: any;

  private CONFIG_TESTER_KEY = "config_tester";
  fields: FormlyFieldConfig[] = [ 
    {
      key: this.CONFIG_TESTER_KEY,
      type: "enum",
      defaultValue: "default",
      templateOptions: {
        label: "Config tester",
        hintEnd: "The name of the config tester selected",
        change: (field, $event) => {
            this.updateConfigTester($event.value);
        },
        options: []
      },
    },
  ];
  model = {};
  formDropDown: FormGroup = new FormGroup({});
  private testConfigSpec: TestConfigSpec = undefined;

  constructor(private editorService: EditorService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.testConfigSpec = this.editorService.testConfigSpec.find(x => x.name === DEFAULT_CONFIG_TESTER_NAME);
    if (this.testConfigSpec.config_testing) {
      let schema = this.testConfigSpec.test_schema;
      this.editorService.configSchema.formatTitlesInSchema(schema, '');
      this.field = new FormlyJsonschema().toFieldConfig(schema, { map: SchemaService.renameDescription });
      this.initDropdown();
    }
  }

  runTest() {
    this.editorService.configStore.testService
      .test(this.form.value, this.testingType)
      .pipe(take(1))
      .subscribe((r: ConfigTestResult) => {
        this.output = r;
        this.isInvalid = r !== undefined ? false : true;
        this.cd.markForCheck();
      });
  }

  initDropdown() {
    return this.fields.map(f => {
      if (f.key === this.CONFIG_TESTER_KEY) {
        f.templateOptions.options = this.editorService.testConfigSpec.map( tester => {
          return { value: tester.name, label: tester.name}
        })
      }
    })
  }

  updateConfigTester(testerName: string) {
    const tester = this.editorService.testConfigSpec.find(x => x.name === testerName);
    if (tester !== undefined) {
      this.testConfigSpec = tester;
      if (this.testConfigSpec.config_testing) {
        let schema = this.testConfigSpec.test_schema;
        this.editorService.configSchema.formatTitlesInSchema(schema, '');
        this.field = new FormlyJsonschema().toFieldConfig(schema, { map: SchemaService.renameDescription });
      }
    }

  }
}
