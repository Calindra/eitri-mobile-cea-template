# Eitri Boilerplate

Este é o eitriapp padrão para a aplicação da C&A. Neste boilerplate você já encontrará algumas características pré-definidas:

- O eitriapp já utiliza a biblioteca de componentes compartilhados da C&A por padrão `@cea-components:x.x.x`
- Integração com Azure DevOps da C&A
- O projeto de eitriapp envolopado com node e com as dependencias necessárias para execução de testes automatizados

# Para rodar o projeto

Você precisará de:

1. O app da C&A em versão de QA/HML (ou outra não produtiva)
2. Seguir os [passos de instalação da eitri-cli](https://docs.eitri.tech/pt/eitri-cli/)
3. Logar com sua conta Eitri usando o comando `eitri login`
4. Dentro da pasta do projeto rodar o comando `eitri start`
5. Escaneie o QRCode apresentado na sua tela com a câmera presente no menu do app da C&A no item "Eitri"

> Seu eitriapp irá rodar a partir do código disponível localmente com hot-reload à medida que você salva seus arquivos.

## Integrando com Azure DevOps

A integração com o Azure DevOps da C&A inclui algumas configurações que precisam ser feitas para que seu eitriapp seja publicado corretamente. São elas:

### Variáveis para integração

Para que a integração com a plataforma Eitri com a pipeline C&A funcione corretamente, algumas variáveis de ambiente devem estar setadas.

#### Variáveis já configuradas por padrão no pipeline C&A

A maioria das variáveis necessárias já vem configurada nas variable groups já definidas no `azure-pipeline.yaml`:

- app-eitri-cea-common
  - `EITRI_CLI_CLIENT_ID`: clientId do usuário a ser utilizado para CI
  - `EITRI_CLI_CLIENT_SECRET`: clientSecret do usuário a ser utilizado para CI
  - `NODEJS_VERSION`: "18.x"
  - `COVERAGE_REPORT_PATH`: $(Build.SourcesDirectory)/coverage/cobertura-coverage.xml
  - `SONAR_PATH_SOURCES`: "src"
  - `SONAR_EXCLUSIONS`: "**/node_modules/**,**/coverage/**, **/_devops_/**"	
  - `SONAR_REPORT_PATH`: "coverage/lcov.info"

- app-eitri-cea-dev
  - `ENVIROMENT_ID`: 4ef3af42-c227-4b78-a148-55a6af7a6a24

- app-eitri-cea-prd
  - `ENVIROMENT_ID`: a988de1d-44ef-46d0-9c11-eb3b8078ce1f

#### Variáveis que exigem configuração manual

**Você precisará substituir** a variable group `app-eitri-cea-seueitriapp-common` pela variable group de seu projeto contendo o nome e a key do projeto no sonar:

  - `SONAR_PROJECT_KEY`: "ceabr_app-eitri-cea-seueitriapp"
> Esta variável deve conter a key do projeto de seu eitriapp no sonar.
  - `SONAR_PROJECT_NAME`: "app-eitri-cea-seueitriapp"
> Esta variável deve conter o nome do projeto de seu eitriapp no sonar.

> ATENÇÃO: Não esqueça de substituir **cea-seueitriapp** pelo slug de seu eitriapp

### Pipeline

É necessário criar a pipeline baseado numa branch que contenha o arquivo yaml gerado e permissionar o uso das variable groups para ela.


## Integrações com Eitri

A integração de CI inclui algumas operações previstas no pipeline. São elas:

### RODAR A PIPELINE manualemnte em branchs feature/*

- Cria uma versão do eitriapp na plataforma Eitri usando o comando `eitri push-version` da [eitri-cli](https://docs.eitri.tech/pt/eitri-cli/)

### MERGE na develop/master

- Publica a versão na plataforma Eitri usando o comando `eitri publish` da [eitri-cli](https://docs.eitri.tech/pt/eitri-cli/) no ambiente respectivo (dev|prd), disponibilizando-a para o público em geral

# Para publicar o projeto

1. Crie uma branch feature/nome-da-sua-feature
2. Certifique-se de incrementar a `version` em seu arquivo `eitri-app.conf.js` com o número da versão adequada de seu eitriapp.
3. Após fazer o commit das alterações necessárias, rode a pipeline configurada nesta branch
4. Será criada uma versão do eitriapp baseada nesta branch com a versão infomada em seu `eitri-app.conf.js` e será gerada uma tag no repositório com a mesma versão.
5. Após os devidos testes, faça o PR/Merge para develop para publicar seu eitriapp em dev/hml e na master para publica-lo em prod.

> OBS: É possível testar e validar versões de eitriapps até mesmo antes da publicação escaneando o QR Code que será gerado para ela no console [console Eitri](https://console.eitri.tech)

> OBS2: Não esqueça de substituir as strings que contem **"seueitriapp"** conforme instruido para cada arquivo.

# Mais informações

Para saber mais sobre o eitri, acesse o site [eitri.tech](https://eitri.tech/)
Para conhecer a tecnologia, recursos e capacidades, acesse a [documentação do eitri](https://docs.eitri.tech/)