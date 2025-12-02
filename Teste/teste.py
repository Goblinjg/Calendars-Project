from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import random


URL_BASE = "http://localhost:5173"
USER_PASS = "123456"
SLOW_MOTION = 2 


servico = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=servico)
driver.maximize_window()
wait = WebDriverWait(driver, 10)

def log(msg):
    print(f"[TESTE] {msg}")

def pausar():
    time.sleep(SLOW_MOTION)

def lidar_com_alerta_nativo(esperado=True):
    """
    Tenta focar e aceitar um alerta nativo (alert/confirm).
    Se 'esperado' for True, ele espera o alerta aparecer.
    """
    try:

        WebDriverWait(driver, 3).until(EC.alert_is_present())
        alerta = driver.switch_to.alert
        texto = alerta.text
        log(f"   ⚠️ Alerta Nativo detectado: '{texto}'")
        alerta.accept() # Clica em OK
        log("   ✅ Alerta aceito.")
        time.sleep(1) # Dá um tempo para o navegador se recuperar
    except:
        if esperado:
            log("   ⚠️ Aviso: Esperava um alerta, mas ele não apareceu.")
        else:
            pass 

try:

    # 1. CT-001: CADASTRAR USUÁRIO

    log("--- 1. Iniciando Cadastro ---")
    driver.get(f"{URL_BASE}/cadastro")
    
    email_novo = f"aluno.{random.randint(10000, 99999)}@orkut.com"
    log(f"   Usuário: {email_novo}")
    
    driver.find_element(By.ID, "nome").send_keys("Aluno Teste")
    driver.find_element(By.ID, "email").send_keys(email_novo)
    driver.find_element(By.ID, "senha").send_keys(USER_PASS)
    driver.find_element(By.ID, "confirmar").send_keys(USER_PASS)
    pausar()
    
    driver.find_element(By.XPATH, "//button[contains(text(), 'Cadastrar')]").click()
    
    # Verifica sucesso
    try:
        wait.until(EC.url_contains("/login"))
        log("✅ Cadastro OK.")
    except:
        log("❌ Falha no cadastro.")

    # 2. LOGIN

    log("\n--- 2. Realizando Login ---")
    wait.until(EC.visibility_of_element_located((By.ID, "email"))).send_keys(email_novo)
    driver.find_element(By.ID, "senha").send_keys(USER_PASS)
    driver.find_element(By.XPATH, "//button[contains(text(), 'Entrar')]").click()
    
    # Verifica se tem alerta de boas vindas ou erro
    lidar_com_alerta_nativo(esperado=False)

    wait.until(EC.url_contains("/dashboard"))
    log("✅ Login OK.")


    # 3. CT-002: CRIAR ANOTAÇÃO 

    log("\n--- 3. Teste de Anotação (Apenas Criação) ---")
    driver.get(f"{URL_BASE}/anotacoes")
    
    #  PREENCHER 
    log("   Aguardando formulário de anotação...")
    try:
       
        input_titulo = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[@placeholder='Ex: Resumo de História']")))
    except:
        log("❌ Input de título não encontrado. A página carregou?")
        raise

    log("   Criando anotação...")
    input_titulo.clear()
    input_titulo.send_keys("Nota Teste Selenium")
    

    driver.find_element(By.TAG_NAME, "textarea").send_keys("Conteúdo da nota apenas para criação.")
    pausar()
    

    log("   Salvando...")
    # Busca o botão 'Salvar'
    driver.find_element(By.XPATH, "//button[contains(text(), 'Salvar')]").click()
    
    # Lidar com Alerta de Sucesso 
    lidar_com_alerta_nativo(esperado=True)
    
    pausar()


    log("   Verificando se a nota apareceu na lista...")
    try:
        # Verifica se o texto apareceu na tela
        wait.until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Nota Teste Selenium')]")))
        log("✅ CT-006 PASSOU: Anotação criada e listada com sucesso.")
    except:
        log("❌ CT-006 FALHOU: A anotação não apareceu na lista.")


   
        
        
        

    # 4. CT-005: TAREFA SEM MATÉRIA 

    log("\n--- 4. Teste de Tarefa (Sem Matéria) ---")
    driver.get(f"{URL_BASE}/tarefas")
    

    log("   Aguardando formulário carregar...")
    try:
    
        input_desc = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[@placeholder='Ex: Lista 01']")))

    except:
        log("❌ Campo de descrição não encontrado. Verifique se a página carregou.")
        raise

    pausar()
    
    # 2. Preenche a Descrição
    log("   Preenchendo descrição...")
    input_desc.clear()
    input_desc.send_keys("Tarefa Sem Matéria Teste")
    
    # 3. Preenche a Data
  
    log("   Preenchendo data...")
    try:
      
        input_data = driver.find_element(By.XPATH, "//input[@type='date']")
        input_data.send_keys("31122025") 
        pausar()
    except:

        input_desc.send_keys(Keys.TAB) 
        driver.switch_to.active_element.send_keys("31122025")
        pausar()

    pausar()

    # 4. Clica em "Criar" (Sem selecionar matéria)
    log("   Clicando em Criar (Esperando erro de validação)...")
    try:
        # O botão na imagem é preto e diz "+ Criar" ou só "Criar"
        driver.find_element(By.XPATH, "//button[contains(text(), 'Criar')]").click()
        pausar()
    except:
        log("❌ Botão 'Criar' não encontrado.")


    
    # Verifica se continua na mesma URL 
    if "/tarefas" in driver.current_url:
        log("✅ CT-005 PASSOU: O sistema não navegou para outra página (Bloqueio funcionou).")
        

        elem_ativo = driver.switch_to.active_element
        try:

            tag_name = elem_ativo.tag_name
            log(f"   Elemento após erro: <{tag_name}>")
            pausar()
        except:
            pass
    else:
        log("❌ CT-005 FALHOU: O sistema permitiu criar sem matéria ou redirecionou.")

except Exception as e:
    log(f"💥 ERRO FATAL: {e}")

finally:
    log("\n--- Fim ---")
    time.sleep(3)
    driver.quit()