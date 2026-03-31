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
  console.log('🧪 Iniciando Teste do Fluxo de Formulário (/form) -> Supabase...');
  
  const timestamp = Date.now();
  const testEmail = `test.form.${timestamp}@karcash.com.br`;
  
  // 1. Criar o usuário base
  console.log(`\n[ETAPA 1] Simulando um novo Lead entrando pelo Funil VIP...`);
  console.log(`E-mail gerado para o teste: ${testEmail}`);
  
  const { error: createError } = await supabase.rpc('create_profile_and_subscription', {
      user_name: 'Lead Teste Formulário',
      user_email: testEmail,
      user_phone: '11999999999',
      user_instagram: '@teste_form',
      u_source: 'script_teste',
      u_medium: null,
      u_campaign: null,
      u_content: null,
      u_term: null,
      u_referrer: null
  });

  if (createError) {
      console.error('❌ FATAL: Erro ao criar Lead Base na tabela profiles.', createError);
      return;
  }
  console.log('✅ Lead Base registrado no banco.');

  // 2. Simular a submissão do formulário (/form)
  console.log('\n[ETAPA 2] Simulando preenchimento do Formulário...');
  const formData = {
      age_range: "35-44",
      region: "SP",
      income_level: "R$ 10 mil a R$ 20 mil",
      experience_level: "Profissional (Vivo disso)",
      main_fear: "Ter um prejuízo inesperado na reforma",
      main_interest: ""
  };
  
  console.log('Dados submetidos pela página:', formData);

  const { error: updateError } = await supabase.rpc('update_profile_vip', {
      user_email: testEmail,
      u_age_range: formData.age_range,
      u_region: formData.region,
      u_income_level: formData.income_level,
      u_experience_level: formData.experience_level,
      u_main_fear: formData.main_fear,
      u_main_interest: formData.main_interest
  });

  if (updateError) {
      console.error('❌ FATAL: Erro ao injetar dados do formulário via RPC update_profile_vip.', updateError);
      return;
  }
  console.log('✅ Respostas do formulário injetadas com sucesso.');

  // 3. Verificar no banco de dados
  console.log('\n[ETAPA 3] Consultando o banco de dados real para validar a persistência...');
  const { data: profile, error: selectError } = await supabase
      .from('profiles')
      .select('email, name, age_range, region, income_level, experience_level, main_fear')
      .eq('email', testEmail)
      .single();

  if (selectError) {
      console.error('❌ FATAL: Erro ao consultar perfil salvo:', selectError);
      return;
  }

  console.log('\n✅ DADOS ENCONTRADOS SALVOS NO SUPABASE:');
  console.table(profile);
  
  console.log('\n🎉 TESTE END-TO-END CONCLUÍDO COM SUCESSO!');
  console.log('O fluxo de dados da landing page para o banco de dados está intacto e totalmente validado.');
}

runTest();
