@ECHO OFF
SET DIRNAME=%~dp0
IF "%DIRNAME%"=="" SET DIRNAME=.
SET APP_BASE_NAME=%~n0
SET APP_HOME=%DIRNAME%

SET DEFAULT_JVM_OPTS=

IF EXIST "%APP_HOME%\gradle\wrapper\gradle-wrapper.jar" GOTO init

ECHO.
ECHO ERROR: gradle-wrapper.jar not found.
ECHO.

GOTO end

:init

SET CLASSPATH=%APP_HOME%\gradle\wrapper\gradle-wrapper.jar

"%JAVA_HOME%\bin\java.exe" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %GRADLE_OPTS% ^
 -Dorg.gradle.appname=%APP_BASE_NAME% ^
 -classpath "%CLASSPATH%" ^
 org.gradle.wrapper.GradleWrapperMain %*

:end
