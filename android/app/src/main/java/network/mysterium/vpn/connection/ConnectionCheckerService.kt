package network.mysterium.vpn.connection

import android.content.Intent
import android.util.Log
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

class ConnectionCheckerService : HeadlessJsTaskService() {
    override fun getTaskConfig(intent: Intent?): HeadlessJsTaskConfig? {
        if (intent == null) {
            return null
        }
        val extras = intent.extras ?: return null
        return HeadlessJsTaskConfig(NAME, Arguments.fromBundle(extras), TIMEOUT, true)
    }

    companion object {
        private const val NAME = "ConnectionChecker"
        private const val TIMEOUT: Long = 60000
    }
}
