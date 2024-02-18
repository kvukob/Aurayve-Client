<script setup lang="ts">

</script>

<template>
  <q-card class="text-center card bg-transparent">
    <q-card-section>
      <span class="text-h6">Frequently Asked Questions</span>
    </q-card-section>
    <q-card-section class="text-left">
      <q-list>
        <q-expansion-item
          group="faq-group"
          label="What is Aurayve?"
          icon="las la-brain"
          expand-icon-class="text-primary"
        >
          <q-card class="card" flat>
            <q-card-section>
              Aurayve is a trading exchange comprised of coins that hold <span
              class="text-accent">no real-world value</span>.
              Coins can be freely traded without market maker interference, providing an entirely human trading
              experience. Leaving behind archaic order books, we focused on implementing a market making strategy used
              by modern defi platforms, allowing traders to have liquidity at any price while eliminating market maker
              manipulation.
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          group="faq-group"
          label="Can I exchange assets to fiat or cryptocurrencies?"
          icon="las la-brain"
          expand-icon-class="text-primary"
        >
          <q-card class="card" flat>
            <q-card-section>
              <span class="text-accent">No.</span> There are plans in the future to potentially create a token that
              is linked to Aurayve on a blockchain, however, it will be for experimental purposes only.
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          group="faq-group"
          label="Can I create an asset and have it be traded?"
          icon="las la-brain"
          expand-icon-class="text-primary"
        >
          <q-card class="card" flat>
            <q-card-section>
              Yes! Although, you will need to accumulate enough <span class="text-accent">AYST</span> to pay a
              listing fee. Afterwards, your coin can be traded on the spot market.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style scoped>
</style>
