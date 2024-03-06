#version 330 core

// Outputs colors in RGBA
out vec4 FragColor;


// Inputs the color from the Vertex Shader
in vec3 color;
// Inputs the texture coordinates from the Vertex Shader
in vec2 texCoord;

in vec3 Normal;
in vec3 crntPos;

// Gets the Texture Unit from the main function
uniform sampler2D tex0;

uniform vec4 lightColor;

uniform vec3 lightPos;
uniform vec3 camPos;


vec4 pointLight()
{
	vec3 lightVec = lightPos - crntPos;
	float dist = length(lightVec);
	float a = 3.0;
	float b = 0.7;
	float inten = 1.0f / (a * dist * dist + b * dist + 1.0f);
	float ambient = 0.2f;
	vec3 normal = normalize(Normal);
	vec3 lightDirection = normalize(lightVec);
	
	float specularLight = 0.50f;
	vec3 viewDirection = normalize(lightVec);
	vec3 reflectionDirection = reflect(-lightDirection, normal);
	float specAmount = pow(max(dot(viewDirection, reflectionDirection), 0.0f), 16);
	float specular = specAmount * specularLight;

	float diffuse = max(dot(normal, lightDirection), 0.0f);

	return texture(tex0, texCoord) * lightColor * (diffuse + ambient + specular * inten);
}

vec4 direcLight()
{
	vec3 lightVec = lightPos - crntPos;
	float dist = length(lightVec);
	float a = 3.0;
	float b = 0.7;
	float inten = 1.0f / (a * dist * dist + b * dist + 1.0f);
	float ambient = 0.2f;
	vec3 normal = normalize(Normal);
	vec3 lightDirection = normalize(vec3(1.0f, 1.0f, 0.0f));
	
	float specularLight = 0.50f;
	vec3 viewDirection = normalize(lightVec);
	vec3 reflectionDirection = reflect(-lightDirection, normal);
	float specAmount = pow(max(dot(viewDirection, reflectionDirection), 0.0f), 16);
	float specular = specAmount * specularLight;

	float diffuse = max(dot(normal, lightDirection), 0.0f);

	return texture(tex0, texCoord) * lightColor * (diffuse + ambient + specular);
}

void main()
{
	FragColor = pointLight();
}