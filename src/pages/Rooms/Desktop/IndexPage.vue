<template>
  <div class="q-pa-md">
    <q-table
      style="height: calc(100vh - 96px)"
      :rows="allRooms"
      :columns="cols"
      title="Xonalar ma'lumotlari"
      row-key="name"
      :pagination="{ rowsPerPage: 12 }"
    >
      <template v-slot:top-right>
        <q-select
          style="height: 60px !important; width: 250px"
          v-model="filter"
          :options="getRoomsGames"
          label="Filter"
          emit-value
          map-options
          class="q-mx-md"
          behavior="menu"
          color="primary"
          clearable
        >
          <template v-slot:prepend>
            <q-icon color="primary" name="filter_alt" v-if="filter === ''" />
          </template>
        </q-select>
      </template>
      <template v-slot:body-cell="props">
        <q-td style="width: 80px" v-if="props.col.name === 'actions'">
          <q-btn
            color="primary"
            flat
            round
            dense
            icon="edit"
            @click="openDialog('update', props.row)"
          />
          <q-btn
            color="red-4"
            flat
            round
            dense
            icon="delete"
            @click="deleteItem(props.row._id, props.row.idx)"
          />
        </q-td>
        <q-td
          v-else-if="props.col.name === 'index'"
          class="text-left"
          style="width: 70px"
        >
          {{ props.value }}
        </q-td>
        <q-td v-else>
          <div class="text-center">{{ props.value }}</div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { tableCols } from "src/composables/tableColumns";
import { useRoomStore } from "src/stores/room";
const cols = tableCols().rooms;

const { allRooms, filter, getRoomsGames } = storeToRefs(useRoomStore());
const { openDialog, deleteItem } = useRoomStore();
</script>
