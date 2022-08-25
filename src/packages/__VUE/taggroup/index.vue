<script lang="ts">
import { h } from 'vue';
import { createComponent } from '@/packages/utils/create';
const { componentName, create } = createComponent('taggroup');

export default create({
  props: {
    size: {
      type: String,
      default: '' // small
    }
  },
  emits: [],
  setup(props, { slots }) {
    return () => {
      return h(
        'view',
        {
          class: `${componentName}${props.size ? ` ${componentName}--${props.size}` : ''}`
        },
        [
          h(
            'view',
            {
              class: `${componentName}-inner${props.size ? ` ${componentName}-inner--${props.size}` : ''}`
            },
            slots.default?.()
          )
        ]
      );
    };
  }
});
</script>
