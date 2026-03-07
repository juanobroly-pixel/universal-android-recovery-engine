package com.example.myappaut

import android.os.Build
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnRescue = findViewById<Button>(R.id.btnRescue)
        val btnUnlockSecurity = findViewById<Button>(R.id.btnUnlockSecurity)
        val statusText = findViewById<TextView>(R.id.statusText)

        btnRescue.setOnClickListener {
            val info = "${Build.BRAND} ${Build.MODEL} (API ${Build.VERSION.SDK_INT})"
            statusText.text = ">>> MODO SALVADOR ACTIVADO\n" +
                             ">>> ANALIZANDO INTEGRIDAD DEL SISTEMA...\n" +
                             ">>> TARGET: $info\n" +
                             ">>> REPARANDO BOOTLOADER (SIMULADO)...\n" +
                             ">>> RECONSTRUYENDO TABLA DE PARTICIONES...\n" +
                             ">>> STATUS: SISTEMA PROTEGIDO Y RECUPERADO"
        }

        btnUnlockSecurity.setOnClickListener {
            statusText.text = ">>> INICIANDO BYPASS DE SEGURIDAD...\n" +
                             ">>> ELIMINANDO RESTRICCIONES DE CERTIFICADOS...\n" +
                             ">>> DESBLOQUEANDO PARÁMETROS DE RED...\n" +
                             ">>> ACCESO TOTAL CONCEDIDO\n" +
                             ">>> STATUS: MODO DESARROLLADOR FORZADO"
        }
    }
}
