import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Tenta usar a SERVICE_ROLE (banco completo) ou a chave anônima
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY; 

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
  console.log('🚗 Iniciando Teste do Fluxo de Venda de Carro (/sell) -> Supabase...');
  
  const timestamp = Date.now();
  const testEmail = `test.sell.${timestamp}@karcash.com.br`;
  
  const formData = {
      name: "João Vendedor de Carro",
      email: testEmail,
      whatsapp: "11988887777",
      carModel: "Honda Civic EXL",
      carYear: "2021",
      description: "Amassado na porta do motorista e parachoque traseiro arranhado."
  };
  
  console.log('\n[ETAPA 1] Simulando submissão do formulário na página /sell (Antiga /vender)...');
  console.log('Dados preenchidos no form:', formData);
  
  console.log('\n[ETAPA 2] Enviando payload para a tabela "seller_leads"...');
  const { data, error } = await supabase
      .from("seller_leads")
      .insert([
          {
              name: formData.name,
              email: formData.email,
              whatsapp: formData.whatsapp,
              car_model: formData.carModel,
              car_year: parseInt(formData.carYear),
              description: formData.description,
              status: "pending"
          }
      ])
      .select();

  if (error) {
      console.error('❌ FATAL: Erro ao inserir na tabela reseller_leads.', error);
      return;
  }
  
  console.log('\n✅ PROPOSTA SALVA COM SUCESSO NO BANCO DE DADOS:');
  console.table(data[0]);
  
  console.log('\n[ETAPA 3] Teste Integrado concluído validando a tabela!');
  console.log('Nota: Na aplicação real, um email para a KarCash é disparado após este insert.');
}

runTest();
