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

> Seu eitriapp irá rodar a partir do código disponível localmente com hotreload à medida que você salva seus arquivos.

## Integrando com Azure DevOps

A integração com o Azure DevOps da C&A inclui algumas configurações que precisam ser feitas para que seu eitriapp seja publicado corretamente. São elas:

### Variáveis para integração

Para que a integração com a plataforma Eitri com a pipeline C&A funcione corretamente, algumas variáveis de ambiente devem estar setadas.

#### Variáveis já configuradas por padrão

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

### Pipeline

A configuração do pipeline para seu repositório precisa ser realizada pelo time de infra-estrutura da C&A.


## Integrações com Eitri

A integração de CI inclui algumas operações previstas no pipeline. São elas:

### MERGE na develop/master

- Cria a versão na plataforma Eitri usando o comando `eitri push-version` da [eitri-cli](https://docs.eitri.tech/pt/eitri-cli/)

### APPROVE do pipeline

- Publica a versão na plataforma Eitri usando o comando `eitri publish` da [eitri-cli](https://docs.eitri.tech/pt/eitri-cli/) no ambiente respectivo (dev|prd)


## Testando sua integração

Para testar se sua integração com Azure DevOps foi configurada corretamente, você deve:

1. Substituir as strings que contem **"seueitriapp"** conforme instruido para cada arquivo.
2. Criar uma tag com o numero da versão à ser publicada e atualizar seu eitri-app.conf.js com esse mesmo número de versão
3. Abrir um PR para a branch develop.
4. O pipeline olhará para a tag para verificar o numero da versão e tentará cria-la na plataforma Eitri. É possível verificar se a mesma foi criada corretamente após o merge no [console Eitri](https://console.eitri.tech).
5. Ao mergear na develop, sua versão de eitriapp deverá ser criada na plataforma e ao aprovar o pipeline em sua etapa final de validação esta versão deverá ser publicada no ambiente de **dev** na plataforma Eitri.


# Mais informações

Para saber mais sobre o eitri, acesse o site [eitri.tech](https://eitri.tech/)
Para conhecer a tecnologia, recursos e capacidades, acesse a [documentação do eitri](https://docs.eitri.tech/)