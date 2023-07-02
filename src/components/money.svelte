<script lang="ts">
    export let money: {
      amount: string
      currency: string
    }
    let className = ''
    export { className as class }
  
    // Add leading zero if needed
    function formatAmount(amount: string): string {
      const [integerPart, decimalPart] = amount.split('.')
      const formattedDecimalPart = decimalPart.padStart(2, '0')
      return `${integerPart},${formattedDecimalPart}`
    }
  </script>
  
  <span class={className}>
    €{formatAmount(money.amount)}
  </span>