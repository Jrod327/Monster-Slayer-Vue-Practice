function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			currentRound: 0,
			winner: null,
			battleLog: []
		}
	},
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.monsterHealth <= 0) {
				this.winner = "draw"
			} else if (value <= 0) {
				this.winner = "monster"
			}
		},
		monsterHealth(value) {
			if (value <= 0 && this.playerHealth <= 0) {
				this.winner = "draw"
			} else if (value <= 0) {
				this.winner = "player"
			}
		}
	},
	methods: {
		attackMonster() {
			this.currentRound++
			const attackValue = getRandomValue(5, 12)
			this.monsterHealth -= attackValue
			this.addBattleLogMessage("Player", "attack", attackValue)
			this.attackPlayer()
		},
		attackPlayer() {
			const attackValue = getRandomValue(8, 15)
			this.playerHealth -= attackValue
			this.addBattleLogMessage("Monster", "attack", attackValue)
		},
		specialAttackMonster() {
			this.currentRound++
			const specialAttackValue = getRandomValue(10, 25)
			this.monsterHealth -= specialAttackValue
			this.addBattleLogMessage("Player", "attack", specialAttackValue)
			this.attackPlayer()
		},
		healPlayer() {
			this.currentRound++
			const healValue = getRandomValue(8, 20)
			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100
			} else {
				this.playerHealth += healValue
			}
			this.addBattleLogMessage("Player", "heal", healValue)
			this.attackPlayer()
		},
		newGame() {
			this.playerHealth = 100
			this.monsterHealth = 100
			this.currentRound = 0
			this.winner = null
			this.battleLog = []
		},
		surrender() {
			this.winner = "monster"
		},
		addBattleLogMessage(who, what, value) {
			this.battleLog.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value
			})
		}
	},
	computed: {
		monsterBarStyles() {
			if (this.monsterHealth < 0) {
				return { width: "0%" }
			}
			return { width: this.monsterHealth + "%" }
		},
		playerBarStyles() {
			if (this.playerHealth < 0) {
				return { width: "0%" }
			}
			return { width: this.playerHealth + "%" }
		},
		specialAttackAvailable() {
			return this.currentRound % 3 !== 0
		}
	}
})

app.mount("#game")
