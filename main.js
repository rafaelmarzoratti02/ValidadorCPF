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
  console.log(digito2)

  const novoCpf = cpfParcial + digito1 + digito2
  console.log(novoCpf)
  return true
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

const cpf = new ValidaCpf("705.484.450-52")
console.log(cpf.valida())
