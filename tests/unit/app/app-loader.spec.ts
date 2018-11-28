import AppLoader from '../../../src/app/app-loader'
import Connection from '../../../src/app/core/connection'
import ProposalsStore from '../../../src/app/stores/proposals-store'
import TequilApiDriver from '../../../src/libraries/tequil-api/tequil-api-driver'

const emptyPromise = new Promise((resolve) => resolve({}))
const TequilApiDriverMock = jest.fn<TequilApiDriver>(() => ({
  healthcheck: jest.fn().mockReturnValue(emptyPromise),
  startFetchers: jest.fn().mockReturnValue(emptyPromise),
  unlock: jest.fn().mockReturnValue(emptyPromise)
}))

const ConnectionMock = jest.fn<Connection>(() => ({
  startUpdating: jest.fn().mockReturnValue(null)
}))
const ProposalsStoreMock = jest.fn<ProposalsStore>(() => ({
  startUpdating: jest.fn().mockReturnValue(null)
}))

describe('AppLoader', () => {
  describe('.load', () => {
    it('unlocks identity and starts fetchers', async () => {
      const tequilApiDriver = new TequilApiDriverMock()
      const connection = new ConnectionMock()
      const proposalsStore = new ProposalsStoreMock()
      const loader = new AppLoader(tequilApiDriver, connection, proposalsStore)

      await loader.load()

      expect(tequilApiDriver.healthcheck).toHaveBeenCalledTimes(1)
      expect(tequilApiDriver.unlock).toHaveBeenCalledTimes(1)

      expect(connection.startUpdating).toHaveBeenCalledTimes(1)

      expect(proposalsStore.startUpdating).toHaveBeenCalledTimes(1)
    })
  })
})
