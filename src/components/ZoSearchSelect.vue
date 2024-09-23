<template>
    <q-select
      v-model="internalValue"
      use-input
      :label="label"
      hide-selected
      fill-input
      :input-debounce="inputDebounce"
      :clearable="clearable"
      :options="filteredOptions"
      @filter="filterFn"
      @update:model-value="handleProductSelect"
      :hint="hint"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            Маҳсулот топилмади
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
            <q-item-label class="text-grey-9">
              {{ scope.opt.description }}
            </q-item-label>
            <q-item-label class="text-grey-9">
              {{ scope.opt?.extraDescription }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { cryltolatin } from 'src/utils/search';

const props = defineProps({
  label: {
    type: String,
    default: 'Қидирув тизими'
  },
  options: {
    type: Array,
    required: true
  },
  inputDebounce: {
    type: Number,
    default: 1000
  },
  clearable: {
    type: Boolean,
    default: true
  },
  hint: {
    type: String,
    default: 'Энг камида 3 та белги киритинг'
  }
});

const emit = defineEmits(['update:model-value']);

const internalValue = ref(null);

const filteredOptions = ref(props.options);

function filterFn(val, update, abort) {
  if (val.length < 3) {
    abort();
    return;
  }

  update(() => {
    const needle = cryltolatin(val.toLowerCase());
    filteredOptions.value = props.options.filter(
      (v) =>
        cryltolatin(v.label.toLowerCase()).indexOf(needle) > -1 ||
        (v.code &&
          cryltolatin(v.code.toLowerCase()).indexOf(needle) > -1)
    );
  });
}

function handleProductSelect(product) {
  if(product) {
    emit('update:model-value', product);
  }
}
</script>
