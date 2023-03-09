function ValidaCpf(cpf) {
  Object.defineProperty(this, "cpfLimpo", {
    enumerable: true,
    get: function () {
      return cpf.replace(/\D+/g, "")
    },
  })
}

ValidaCpf.prototype.valida = function () {
  if (typeof this.cpfLimpo === "undefined") return false
  if (this.cpfLimpo.length !== 11) return false

  let cpfParcial = this.cpfLimpo.slice(0, -2)
  const digito1 = this.criaDigito(cpfParcial)
  const digito2 = this.criaDigito(cpfParcial + digito1)
  if (this.isSequencia()) return false

  const novoCpf = cpfParcial + digito1 + digito2
  return novoCpf === this.cpfLimpo
}

ValidaCpf.prototype.criaDigito = function (cpfParcial) {
  const cpfArray = Array.from(cpfParcial)
  let regressivo = cpfArray.length + 1

  const total = cpfArray.reduce((ac, val) => {
    ac += Number(val) * regressivo
    regressivo--
    return ac
  }, 0)
  const digito = 11 - (total % 11)
  return digito > "9" ? "0" : digito
}

ValidaCpf.prototype.isSequencia = function () {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
  return sequencia === this.cpfLimpo ? true : false
}

const cpf = new ValidaCpf("054.101.590-71")
if (cpf.valida()) {
  console.log("Cpf válido")
} else {
  console.log("Cpf inválido")
}
