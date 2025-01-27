import {
  RiAddCircleLine,
  RiArrowDownLongLine,
  RiArrowLeftLongLine,
  RiArrowRightLongLine,
  RiDragMoveFill,
  RiFolderOpenLine,
  RiImageLine,
  RiSaveLine,
  RiZoomInLine,
  RiZoomOutLine,
} from '@remixicon/vue';
import { NButton, NLayout, NLayoutContent, NLayoutSider, NTooltip } from 'naive-ui';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import BpmData from './BpmData';
import BpmnPalette from './palette';
import flowableModdle from './flowable/flowable.json';
import flowableInit from './flowable/init';
import translate from './lang/translate';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import './bpmn.scss';

export default defineComponent({
  name: 'workflow-bpmn-modeler',
  props: {
    defaultXml: String,
  },
  setup(props) {
    const { defaultXml = '' } = props;

    const size = ref('14');
    const refCanvas = useTemplateRef('canvas');
    const modeler = ref(null);

    const createNewDiagram = async data => {
      data = data.replace(/<!\[CDATA\[(.+?)]]>/g, (_, str) => {
        return str.replace(/</g, '&lt;');
      });
      try {
        // 将字符串转换成图片
        await modeler.value?.importXML(data);
        adjustPalette();
        // this.fitViewport();
      } catch (err) {
        console.error(err.message, err.warnings);
      }
    };

    const adjustPalette = () => {
      const palette = refCanvas.value?.querySelector('.djs-palette');
      const entries = palette?.querySelector('.djs-palette-entries');
      const groups = entries?.children;

      (groups?.[0]).style.display = 'none';

      if (groups) {
        for (const group of groups) {
          for (const k in group.children) {
            const control = group.children[k];
            if (control.className && control.dataset && control.className.indexOf('entry') !== -1) {
              const props = new BpmData().getControl(control.dataset.action);
              control.innerHTML = `<div class='text-sm' >${props['title']}</div>`;
            }
          }
        }
      }
    };

    onMounted(() => {
      modeler.value = new BpmnModeler({
        container: refCanvas.value,
        propertiesPanel: {
          parent: '#bpmn-properties-panel',
        },
        additionalModules: [
          {
            translate: ['value', translate],
          },
          // BpmnPalette,
        ],
        moddleExtensions: {
          flowable: flowableModdle,
        },
      });

      if (defaultXml) createNewDiagram(defaultXml);
      else createNewDiagram(flowableInit());
    });

    return () => (
      <main class="akir-bpmn-modeler h-full flex flex-col border border-rim2 rounded">
        <header class="border-b border-rim2">
          <div class="p-2 flex justify-between">
            <div class="flex gap-2">
              <NTooltip trigger="hover" class="text-xs">
                {{
                  trigger: () => (
                    <NButton class="px-4" size="small">
                      {{ icon: () => <RiFolderOpenLine size={size.value} /> }}
                    </NButton>
                  ),
                  default: () => <span>加载 xml</span>,
                }}
              </NTooltip>

              <NTooltip trigger="hover" class="text-xs">
                {{
                  trigger: () => (
                    <NButton class="px-4" size="small">
                      {{ icon: () => <RiAddCircleLine size={size.value} /> }}
                    </NButton>
                  ),
                  default: () => <span>新建</span>,
                }}
              </NTooltip>
              <NTooltip trigger="hover" class="text-xs">
                {{
                  trigger: () => (
                    <NButton class="px-4" size="small">
                      {{ icon: () => <RiDragMoveFill size={size.value} /> }}
                    </NButton>
                  ),
                  default: () => <span>自适应屏幕</span>,
                }}
              </NTooltip>
              <NTooltip trigger="hover" class="text-xs">
                {{
                  trigger: () => (
                    <NButton class="px-4" size="small">
                      {{ icon: () => <RiZoomInLine size={size.value} /> }}
                    </NButton>
                  ),
                  default: () => <span>放大</span>,
                }}
              </NTooltip>
              <NTooltip trigger="hover" class="text-xs">
                {{
                  trigger: () => (
                    <NButton class="px-4" size="small">
                      {{ icon: () => <RiZoomOutLine size={size.value} /> }}
                    </NButton>
                  ),
                  default: () => <span>缩小</span>,
                }}
              </NTooltip>
              <NTooltip trigger="hover" class="text-xs">
                {{
                  trigger: () => (
                    <NButton class="px-4" size="small">
                      {{ icon: () => <RiArrowLeftLongLine size={size.value} /> }}
                    </NButton>
                  ),
                  default: () => <span>前进</span>,
                }}
              </NTooltip>
              <NTooltip trigger="hover" class="text-xs">
                {{
                  trigger: () => (
                    <NButton class="px-4" size="small">
                      {{ icon: () => <RiArrowRightLongLine size={size.value} /> }}
                    </NButton>
                  ),
                  default: () => <span>后退</span>,
                }}
              </NTooltip>
            </div>
            <div class="flex gap-2">
              <NButton class="text-xs" size="small">
                {{
                  icon: () => <RiArrowDownLongLine size={size.value} />,
                  default: () => <span>下载 xml</span>,
                }}
              </NButton>
              <NButton class="text-xs" size="small">
                {{
                  icon: () => <RiImageLine size={size.value} />,
                  default: () => <span>下载 svg</span>,
                }}
              </NButton>
              <NButton class="text-xs" type="primary" size="small">
                {{
                  icon: () => <RiSaveLine size={size.value} />,
                  default: () => <span>保存模型</span>,
                }}
              </NButton>
            </div>
          </div>
        </header>
        <NLayout class="grow-1" hasSider>
          <NLayoutContent class="h-full">
            <div class="h-full" ref="canvas" />
            <div id="bpmn-properties-panel" class="panel" />
          </NLayoutContent>
          <NLayoutSider>侧边栏</NLayoutSider>
        </NLayout>
      </main>
    );
  },
});
