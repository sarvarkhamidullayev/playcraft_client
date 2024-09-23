<template>
  <div>Mobile</div>
  <!-- <q-scroll-area
    v-if="getMappedRooms.length > 0"
    class="bg-accent"
    style="height: calc(100vh - 64px)"
  >
    <div class="row q-pa-none">
      <div
        class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-6"
        v-for="item in getMappedRooms"
        :key="item._id"
      >
        <q-card
          dark
          class="bg-primary q-pa-none card-item justify-center items-between shadow-2"
        >
          <q-card-section class="time q-pa-none">
            <div class="row items-center">
              <q-icon
                :class="{ 'text-red-5': item.status === 'expired' }"
                :name="
                  item.status === 'free'
                    ? 'radio_button_unchecked'
                    : item.status === 'expired'
                    ? 'notifications_active'
                    : item.status === 'prepaid'
                    ? 'av_timer'
                    : 'hourglass_empty'
                "
                color="white"
                class="q-mr-xs"
              />

              <div>
                {{ item.status !== "free" ? item.showTime : "--:--" }}
              </div>
            </div>
            <div class="playStation">
              {{ item.playStation.title }}
            </div>
          </q-card-section>
          <q-card-section class="q-pa-none text-white text-center">
            <div class="number q-pa-none">
              {{ item.title }}
            </div>
          </q-card-section>

          <q-card-actions class="button q-pa-none" align="right">
            <q-btn
              v-if="item.status === 'free'"
              flat
              label="Boshlash"
              color="primary"
              @click="openRoom(item._id)"
            />
            <q-btn
              v-else
              flat
              label="Batafsil"
              :class="item.status === 'expired' ? 'text-red-5' : 'text-orange'"
              @click="openDetails(item)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-scroll-area> -->
</template>
