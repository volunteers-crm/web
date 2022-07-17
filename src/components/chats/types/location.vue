<template>
    <div class="pr-2">
        <ol-map style="height:250px">
            <ol-view
                :center="center"
                :projection="projection"
                :rotation="rotation"
                :zoom="zoom"
            />

            <ol-tile-layer>
                <ol-source-osm />
            </ol-tile-layer>

            <ol-vector-layer>
                <ol-source-vector>
                    <ol-feature>
                        <ol-geom-point :coordinates="center" />

                        <ol-style>
                            <ol-style-circle :radius="point.radius">
                                <ol-style-fill
                                    :color="point.fillColor"
                                />

                                <ol-style-stroke
                                    :color="point.strokeColor"
                                    :width="point.strokeWidth"
                                />
                            </ol-style-circle>
                        </ol-style>
                    </ol-feature>

                </ol-source-vector>

            </ol-vector-layer>
        </ol-map>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
    content: LocationMessageType
}>()

const center = ref([
    props.content.latitude,
    props.content.longitude
])

const projection = ref('EPSG:4326')
const zoom = ref(15)
const rotation = ref(0)

const point = ref({
    radius: 10,
    fillColor: '#FFFFFF',
    strokeColor: '#FF0000',
    strokeWidth: 4
})
</script>
