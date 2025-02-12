import { AkirFlow } from './flow';
import './styles.scss';

export default defineComponent({
  setup() {
    return () => (
      <div class="akir-designer">
        <AkirFlow />
      </div>
    );
  },
});
